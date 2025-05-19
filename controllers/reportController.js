const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Report = require('../models/reports');
const { Chart } = require('chart.js'); 
const ChartDataLabels = require('chartjs-plugin-datalabels'); 
Chart.register(ChartDataLabels); 
const Orphanage = require('../models/orphanages');
const Donation = require('../models/donations');
const Revenue = require('../models/revenue');
const Organization = require('../models/organizations');
const User = require('../models/Users');

exports.createReport = async (req, res) => {
  try {
    const { orphanage_id, title, report_content, visibility, income, expenses } = req.body;
    const reportDate = new Date();

    const orphanage = await Orphanage.findByPk(orphanage_id);
    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    const donations = await Donation.findAll({ where: { orphanageId: orphanage_id } });
    const totalDonations = donations.length;

    const revenues = await Revenue.findAll({
      where: { orphanage_id: orphanage_id },
      include: [{
        model: Organization,
        as: 'organization', 
        required: true,  
      }]
    });

    console.log("Revenues with organizations:", revenues);

    const revenueBySource = {
      Donation: 0,
      Sponsorship: 0,
      Partnership: 0,
      'Emergency Campaign': 0
    };
    const partnerOrgs = new Set();

    revenues.forEach(r => {
      if (r.source && revenueBySource[r.source] !== undefined) {
        revenueBySource[r.source] += parseFloat(r.amount || 0);
        if (r.source === 'Partnership' && r.organization) {
          partnerOrgs.add(r.organization.organization_name);
        }
      }
    });

    const totalRevenue = Object.values(revenueBySource).reduce((a, b) => a + b, 0);

    const newReport = await Report.create({
      orphanage_id,
      title,
      report_content,
      visibility,
      income: totalRevenue,  
      expenses,
      report_date: reportDate,
    });

    const doc = new PDFDocument({ margin: 40 });
    const fileName = `report_${newReport.id}.pdf`;
    const outputDir = path.join(__dirname, '..', 'output');
    const filePath = path.join(outputDir, fileName);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    doc.pipe(fs.createWriteStream(filePath));

    
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    doc.strokeColor('#000080')  
       .lineWidth(2)  
       .rect(30, 30, pageWidth - 60, pageHeight - 60)  
       .stroke();

   
    const width = 400; 
    const height = 400; 
    const canvasRenderService = new ChartJSNodeCanvas({ width, height });

    const total = income + expenses;

    const pieChartConfig = {
      type: 'pie',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          label: 'Financial Overview',
          data: [income, expenses],
          backgroundColor: ['#4CAF50', '#FF5722'],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          datalabels: {
            color: '#fff',
            formatter: (value, context) => {
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}%`;
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      },
      plugins: [ChartDataLabels], 
    };

    
    const imageBuffer = await canvasRenderService.renderToBuffer(pieChartConfig);

  
    doc.image(imageBuffer, 140, 430, { width: 300, height: 300 });

    
    doc.fontSize(26).fillColor('#000080').text('Monthly Report', { align: 'center' });
    doc.moveDown(1);

  
    const info = [
      { label: 'Orphanage Name', value: orphanage.name },
      { label: 'Report Title', value: title },
      { label: 'Location', value: orphanage.location },
      { label: 'Contact', value: orphanage.contact_number || 'N/A' },
      { label: 'Email', value: orphanage.email || 'N/A' },
      { label: 'Total Donations', value: totalDonations },
      { label: 'Partner Organizations', value: Array.from(partnerOrgs).join(', ') || 'None' },
      { label: 'Total Revenue', value: totalRevenue.toFixed(2) }, 
      { label: 'Date', value: reportDate.toISOString().split('T')[0] },
      { label: 'Visibility', value: visibility },
    ];

    info.forEach((item) => {
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#000')
        .text(`${item.label}: `, { continued: true });

      doc
        .font('Helvetica')
        .fillColor('#000')
        .text(item.value);

      doc
        .moveDown(0.5) 
        .strokeColor('#808080')
        .lineWidth(1)
        .moveTo(doc.x, doc.y)
        .lineTo(doc.x + 500, doc.y) 
        .stroke();

      doc.moveDown(0.5); 
    });

    doc.moveDown(2);
    doc.end();

    res.status(201).json({
      message: 'Report created successfully',
      report: newReport,
      pdf: `/output/${fileName}`,
    });

  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [{ model: Orphanage, as: 'orphanage' }],
      order: [['report_date', 'DESC']]
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports', error: err.message });
  }
};
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const fileName = `report_${id}.pdf`;
    const filePath = path.join(__dirname, '..', 'output', fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await report.destroy();

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
