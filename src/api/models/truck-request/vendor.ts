export interface VendorData {
  id: number;
  businessName: string;
  preferredName: string;
  phone: string;
  isActive: boolean;
  contactEmail: string;
}

export interface CreateOrUpdateVendor {
  businessName: string;
  preferredName: string;
  phone: string;
  isActive: boolean;
  contactEmail: string;
}
