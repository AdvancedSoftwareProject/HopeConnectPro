const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');
const Organization = require('../models/organizations');

const importLocalOrganizations = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../organizations.csv');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'CSV file not found' });
    }

    const jsonArray = await csv().fromFile(filePath);
    let imported = 0;

    for (const entry of jsonArray) {
      const {
        id,
        organization_name,
        organization_type,
        verified,
        verification_date,
        created_at,
        updated_at,
        orphanage_id
      } = entry;

      if (!organization_name) continue;

      const exists = await Organization.findOne({ where: { organization_name } });
      if (!exists) {
        await Organization.create({
          id: Number(id),
          organization_name,
          organization_type,
          verified: verified === '1' || verified === 'true',
          verification_date: verification_date || null,
          created_at: created_at || new Date(),
          updated_at: updated_at || new Date(),
          orphanage_id: Number(orphanage_id)
        });
        imported++;
      }
    }

    res.json({ message: `${imported} new organizations imported.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to import organizations' });
  }
};

module.exports = {
  importLocalOrganizations
};
