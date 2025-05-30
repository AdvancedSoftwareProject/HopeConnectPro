
const defaultPermissions = {
  canMarkMessagesAsSeen: true,
  canDeleteUser: false,
  canUpdateUser: false,
  canViewUser: false,
  canCreateDonation: false,
  canViewDonations: false,
  canUpdateDonation: false,
  canDeleteDonation: false,
  canUpdateDonationStatus: false,
  canViewUserDonations: false,
  canViewOrphanageDonations: false,
  canViewOrphans: false, 
  canCreateOrphan: false, 
  canUpdateOrphan: false, 
  canDeleteOrphan: false,
  canViewVolunteers: false,
  canCreateVolunteer: false,
  canUpdateVolunteer: false,
  canDeleteVolunteer: false,
  canViewVolunteerByUserId: false,
  canUpdateVolunteerAvailability: false,
  canUpdateVolunteerSkills: false,
  canViewSponsorships: false,
  canCreateSponsorship: false,
  canUpdateSponsorship: false,
  canEndSponsorship: false,
  canViewUserSponsorships: false,
  canViewOrphanSponsorships: false,
  canViewServiceRequests: false,
  canCreateServiceRequest: false,
  canUpdateServiceRequest: false,
  canDeleteServiceRequest: false,
  canViewOrphanageServiceRequests: false,
  canUpdateServiceRequestStatus: false,
  canCreateOrganization: false,
  cangetAllOrganizations: false,
  canupdateOrganization: false,
  candeleteOrganization: false,
  cangetOrganizationStatistics : false,
  canCreateDelivery: false,
  canViewDeliveries: false,
  canUpdateDelivery: false,
  canDeleteDelivery: false,
  canCreateFeedback: false,
  canViewFeedbacks: false,
  canUpdateFeedback: false,
  canDeleteFeedback: false,
  canCreateEmergencyCampaign: false,
canViewEmergencyCampaigns: false,
canUpdateEmergencyCampaign: false,
canDeleteEmergencyCampaign: false,
canCreateEmergencyDonation: false,
canViewEmergencyDonations: false,
canUpdateEmergencyDonation: false,
canDeleteEmergencyDonation: false,
canViewUserEmergencyDonations: false,
canUpdateEmergencyDonation: false,
canViewVolunteerMatches: false,
canCreateVolunteerMatch: false,
canUpdateVolunteerMatch: false,
canDeleteVolunteerMatch: false,
canSearchOrphanages: true, 
canCheckOrphanageCapacity: false,  
canViewOrphanageDetails: false, 
canDeleteOrphanage: false,
canSendMessage: false,
canViewOwnMessages: false,
canMarkMessagesAsSeen: true,

canCreateReport: false,
canViewReports: false,
canDeleteReport: false,
  canViewTrackingUpdates: false,
  canCreateTrackingUpdate: false,
  canUpdateTrackingUpdate: false,
  canDeleteTrackingUpdate: false,

canViewTransactionFees: false,
canCreateTransactionFee: false,
canUpdateTransactionFee: false,
canDeleteTransactionFee: false,

canViewRevenue: false,
canCreateRevenue: false,
canUpdateRevenue: false,
canDeleteRevenue: false,

canCreatePickupCoordination: false,
canViewPickupCoordination: false,
canUpdatePickupCoordination: false,
canDeletePickupCoordination: false,

canCreateEmailNotification: false,
canViewEmailNotifications: false,
canUpdateEmailNotification: false,
canDeleteEmailNotification: false,

canImportOrganizations: false,

 canExportTracking:false 
};

const permissions = {
  Donor: {
    ...defaultPermissions,
    canUpdateUser: true,
    canViewUser: true,
    canViewDonations: true,
    canCreateDonation: true,
    canViewUserDonations: true,
    canViewOrphans: true, 
    canViewVolunteers: true, 
    canViewSponsorships: true,  
    canCreateSponsorship: true, 
    canViewUserSponsorships: true,
    canViewServiceRequests: true, 
    canCreateServiceRequest: true,
    canCreateDelivery: true,
    canViewDeliveries: true,
    canCreateFeedback: true,
    canViewFeedbacks: true,
    canUpdateFeedback: true,
    canDeleteFeedback: true,
    canViewEmergencyCampaigns: true,
    canCreateEmergencyDonation: true,
    canViewEmergencyDonations: true,
    canViewOrphanageDetails: true,
     canSendMessage: true,
    canViewOwnMessages: true,

    canViewTrackingUpdates: true,

      },
  Volunteer: {
    ...defaultPermissions,
    canUpdateUser: true,
    canViewUser: true,
    canViewDonations: true,
    canViewUserDonations: true,
    canViewOrphans: true,
    canViewVolunteers: true, 
    canUpdateVolunteerAvailability: true, 
    canUpdateVolunteerSkills: true,
    canViewSponsorships: true,  
    canViewUserSponsorships: true,
    canViewServiceRequests: true,
    canCreateServiceRequest: true, 
    canViewOrphanageServiceRequests: true,
    canViewOrphanageDetails: true,
    canSendMessage: true,
    canViewOwnMessages: true,

   canViewTrackingUpdates: true,
  canCreateTrackingUpdate: true,

  canViewPickupCoordination: true,

  },
  Admin: {
    ...defaultPermissions,
    canDeleteUser: true,
    canUpdateUser: true,
    canViewUser: true,
    canCreateDonation: true,
    canViewDonations: true,
    canUpdateDonation: true,
    canDeleteDonation: true,
    canUpdateDonationStatus: true,
    canViewUserDonations: true,
    canViewOrphanageDonations: true,
    canViewOrphans: true, 
  canCreateOrphan:true, 
  canUpdateOrphan: true, 
  canDeleteOrphan: true,
  canViewVolunteers: true, 
  canCreateVolunteer: true,
  canUpdateVolunteer: true, 
  canDeleteVolunteer: true, 
  canViewVolunteerByUserId: true, 
  canUpdateVolunteerAvailability: true, 
  canUpdateVolunteerSkills: true,
  canViewSponsorships: true,  
  canCreateSponsorship: true, 
  canUpdateSponsorship: true, 
  canEndSponsorship: true,
  canViewUserSponsorships: true, 
  canViewOrphanSponsorships: true,
  canViewServiceRequests: true,  
    canCreateServiceRequest: true, 
    canUpdateServiceRequest: true, 
    canDeleteServiceRequest: true, 
    canViewOrphanageServiceRequests: true, 
    canUpdateServiceRequestStatus: true, 
    canCreateOrganization: true,
    cangetAllOrganizations: true ,
    canupdateOrganization: true,
    candeleteOrganization : true ,
    cangetOrganizationStatistics : true ,
    canCreateDelivery: true,
    canViewDeliveries: true,
    canUpdateDelivery: true,
    canDeleteDelivery: true,
    canCreateFeedback: true,
    canViewFeedbacks: true,
    canCreateEmergencyCampaign: true,
    canViewEmergencyCampaigns: true,
    canUpdateEmergencyCampaign: true,
    canDeleteEmergencyCampaign: true,
    canCreateEmergencyDonation: true,
    canViewEmergencyDonations: true,
    canUpdateEmergencyDonation: true,
    canDeleteEmergencyDonation: true,
    canViewUserEmergencyDonations: true,
    canUpdateEmergencyDonation: true,
    canViewVolunteerMatches: true,
    canCreateVolunteerMatch: true,
    canUpdateVolunteerMatch: true,
    canDeleteVolunteerMatch: true,
    canCheckOrphanageCapacity:true,
    canViewOrphanageDetails: true,
     canSendMessage: true,
    canViewOwnMessages: true,
    canViewAllMessages: true,
    canMarkMessagesAsSeen: true,
      canCreateReport: true,
      canViewReports: true,
canDeleteReport: true,

      canViewTrackingUpdates: true,
  canCreateTrackingUpdate: true,
  canUpdateTrackingUpdate: true,
  canDeleteTrackingUpdate: true,
    
  canViewTransactionFees: true,
canCreateTransactionFee: true,
canUpdateTransactionFee: true,
canDeleteTransactionFee: true,

canViewRevenue: true,
canCreateRevenue: true,
canUpdateRevenue: true,
canDeleteRevenue: true,

canCreatePickupCoordination: true,
canViewPickupCoordination: true,
canUpdatePickupCoordination: true,
canDeletePickupCoordination: true,

canCreateEmailNotification: true,
canViewEmailNotifications: true,
canUpdateEmailNotification: true,
canDeleteEmailNotification: true,
 canDeleteOrphanage: true,

 canImportOrganizations: true,

  canExportTracking: true
  },
  Organization: {
    ...defaultPermissions,
    canUpdateUser: true,
    canViewUser: true,
    canViewDonations: true,
    canCreateDonation: true,
    canViewUserDonations: true,
    canViewOrphanageDonations: true,
    canViewOrphans: true, 
    canViewVolunteers: true,  
    canViewVolunteerByUserId: true, 
    canViewSponsorships: true,  
    canCreateSponsorship: true, 
    canViewUserSponsorships: true, 
    canViewOrphanSponsorships: true,
    canViewServiceRequests: true, 
    canCreateServiceRequest: true,
    canViewOrphanageServiceRequests: true,
    canupdateOrganization: true ,
    canViewDeliveries: true,
    canViewFeedbacks: true,
    canViewEmergencyCampaigns: true,
    canCheckOrphanageCapacity:true,
    canViewOrphanageDetails: true,
     canSendMessage: true,
    canViewOwnMessages: true,
      canCreateReport: true,
 canViewReports: true, 

 canViewTrackingUpdates: true,
canCreateTrackingUpdate: true,
canUpdateTrackingUpdate: true,

canViewEmailNotifications: true,


  },
Owner: {
  ...defaultPermissions,
  canDeleteUser: true,
  canUpdateUser: true,
  canViewUser: true,
  canCreateDonation: true,
  canViewDonations: true,
  canUpdateDonation: true,
  canDeleteDonation: true,
  canUpdateDonationStatus: true,
  canViewUserDonations: true,
  canViewOrphanageDonations: true,
  canViewOrphans: true,
  canCreateOrphan: true,
  canUpdateOrphan: true,
  canDeleteOrphan: true,
  canViewVolunteers: true,
  canCreateVolunteer: true,
  canUpdateVolunteer: true,
  canDeleteVolunteer: true,
  canViewVolunteerByUserId: true,
  canUpdateVolunteerAvailability: true,
  canUpdateVolunteerSkills: true,
  canViewSponsorships: true,
  canCreateSponsorship: true,
  canUpdateSponsorship: true,
  canEndSponsorship: true,
  canViewUserSponsorships: true,
  canViewOrphanSponsorships: true,
  canViewServiceRequests: true,
  canCreateServiceRequest: true,
  canUpdateServiceRequest: true,
  canDeleteServiceRequest: true,
  canViewOrphanageServiceRequests: true,
  canUpdateServiceRequestStatus: true,
  canCreateOrganization: true,
  cangetAllOrganizations: true,
  canupdateOrganization: true,
  candeleteOrganization: true,
  cangetOrganizationStatistics: true,
  canCreateEmergencyDonation: true,
  canViewEmergencyDonations: true,
  canUpdateEmergencyDonation: true,
  canDeleteEmergencyDonation: true,
  canViewUserEmergencyDonations: true,
  canViewVolunteerMatches: true,
  canCreateVolunteerMatch: true,
  canUpdateVolunteerMatch: true,
  canDeleteVolunteerMatch: true,
  canCheckOrphanageCapacity: true,
  canViewOrphanageDetails: true,
  canDeleteOrphanage: true,
  canSendMessage: true,
  canViewOwnMessages: true,
  canViewAllMessages: true,
  canMarkMessagesAsSeen: true,
    canCreateReport: true,
  canViewReports: true,
  canDeleteReport: true,
    canViewTrackingUpdates: true,
canCreateTrackingUpdate: true,
canUpdateTrackingUpdate: true,
canDeleteTrackingUpdate: true,

canViewTransactionFees: true,
canCreateTransactionFee: true,
canUpdateTransactionFee: true,
canDeleteTransactionFee: true,

canViewRevenue: true,
canCreateRevenue: true,
canUpdateRevenue: true,
canDeleteRevenue: true,

canCreatePickupCoordination: true,
canViewPickupCoordination: true,
canUpdatePickupCoordination: true,
canDeletePickupCoordination: true,

canCreateEmailNotification: true,
canViewEmailNotifications: true,
canUpdateEmailNotification: true,
canDeleteEmailNotification: true,
canImportOrganizations: true

}

};

module.exports = permissions;


  