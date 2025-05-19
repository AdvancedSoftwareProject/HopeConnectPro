const Organization = require('../models/organizations');
const createOrganization = async (req, res) => {
    try {
        const { organization_name, organization_type, verified, orphanage_id } = req.body;

        const existingOrg = await Organization.findOne({
            where: { organization_name }
        });

        if (existingOrg) {
            return res.status(400).json({ message: 'The organization already exists' });
        }

        const newOrg = await Organization.create({
            organization_name,
            organization_type,
            verified,
            orphanage_id 
        });

        const response = {
            organization_name: newOrg.organization_name,
            organization_type: newOrg.organization_type,
            verified: newOrg.verified,
            orphanage_id: newOrg.orphanage_id, 
            id: newOrg.id,
            created_at: newOrg.created_at,
            updated_at: newOrg.updated_at,
        };

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const getAllOrganizations = async (req, res) => {
    try {
      const organizations = await Organization.findAll();  
      res.status(200).json(organizations);  
    } catch (error) {
      res.status(500).json({ error: error.message });  
    }
  };

const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const { organization_name, organization_type, verified, orphanage_id } = req.body;
        const organization = await Organization.findByPk(id);
        
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        
        
        await organization.update({
            organization_name,
            organization_type,
            verified,
            orphanage_id 
        });

        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await Organization.findByPk(id);
        
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        
        await organization.destroy();
        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrganizationStatistics = async (req, res) => {
    try {
        const totalOrganizations = await Organization.count();
        const organizationsByType = await Organization.findAll({
            attributes: ['organization_type', [Organization.sequelize.fn('COUNT', '*'), 'count']],
            group: ['organization_type']
        });
        
        res.status(200).json({ totalOrganizations, organizationsByType });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    updateOrganization,
    deleteOrganization,
    getOrganizationStatistics
};
