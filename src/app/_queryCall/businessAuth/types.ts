export interface BusinessAddressInput {
    addressId?: string | null;
    street?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    country?: string | null;
    order?: number | null;
    toDelete?: boolean | null;
}

export interface UpdateBusinessDetailsVariables {
    addresses?: BusinessAddressInput[];
    primaryWebsite?: string;
    websites?: any[];
    name?: string;
    slug?: string;
    isListed?: boolean;
    registrationNumber?: string;
    license?: string;
    experience?: number;
    teamSize?: number;
    description?: string;
    degrees?: string[];
    gstNumber?: string;
    categoryIds?: string[];
    languages?: string[];
    proficiencies?: string[];
    courts?: string[];
    tags?: string[];
    latitude?: number;
    longitude?: number;
    additionalContacts?: string[];
    logo?: File;
    operatingHours?: any[];

}

export interface UpdateBusinessDetailsResult {
    manageBusinessAddress: {
        message: string;
    };
    updateBusinessDetails: {
        message: string;
    };
}
