
export interface Classes {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;

}

export interface ClasseseResponse extends Response {
    data: Classes[];
}


export interface ClassResponse extends Response {
    data: Classes;
}


export interface Category {
    id?: number;
    name: string;
    school_id: number;
    level: number
}
export interface CategoryRespone extends Response {
    data: Category[];
}

export interface DepartmentRespose extends Response {
    data: Department[];
}

export interface Department {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface Users {
    id?: number;
    name?: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at: string;
}


export interface School {
    id?: number;
    school_name: string;
    address: string;
    phone_no1: string;
    phone_no2?: string
    established_at: string;
    school_owner: string;
    school_logo: string;
    email: string;
    created_at?: string;
    updated_at?: string;

}

export interface SchoolResponse extends Response {
    data: School;
}
export interface SchoolClassInDepartmentResponse extends Response {
    data: SchoolClassInDepartment[];
}
export interface SchoolClassInDepartment {

    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        department_id: number,
        school_class_id: number,
        created_at: string,
        updated_at: string
    }
}

export interface depertmentInCategory {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}


export interface Student {
    id?: number;
    first_name: string;
    last_name: string;
    middle_name?: string;
    gender: string;
    address: string;
    phone_no: string;
    dob: string;
    email: string;
    class_id: number;
    created_at?: string;
    updated_at?: string;
    class_name?: string;
}

export interface AddOrRemove{
    status:boolean;
}
export interface AddOrRemoveResponse{
    data:AddOrRemove;
}
export interface StudentsResponse extends Response {
    data: Student[]
}
export interface StudentResponse extends Response {
    data: Student
}

export interface RolesResponse extends Response {
    data: Role[]
}
export interface ClassesResponse extends Response {
    data: Classes[]
}






export interface Response {
    message?: string,
    status?: string
}
export interface Links {
    url: string;
    label: string;
    active: string;
}

export interface StudentPaginate {
    total: any,
    last_page: any,
    current_page: any
    data: Student[];

}

export interface SchoolSessionAndTernmInfo {
    term_id: number;
    school_session_id: number;
    term_name: string;
    school_session_name: string
}


export interface SchoolSessionAndTernmInfoResponse extends Response {
    data: SchoolSessionAndTernmInfo;
}
export interface CompulsoryBill {
    name: string;
    id: number;
    amount: number;
    description: string;
    type: number;
    school_class_id: number;
    class_name: string

}


export interface Bill {
    name: string;
    id: number;
    amount: number;
    description?: string;
    type: number;
    school_class_id?: number;
    class_name?: string

}

export interface minorBill {
    name?: string;
    id: number;
    amount: number;
    description?: string;

}

export interface billToPay {
    id: number;
    name?: string;
    amount: number | undefined;
    pretty_amount: string;
    quantity?: number|undefined;
       

}

export interface StudentBill {
    id: number;
    name: string;
    amount: string;
    description: string;
    type: number;
    school_class_id: number;
    created_at: string;
    updated_at: string;
    status: boolean;
    balance: number;
    amount_paid: number;
    to_pay?: number;
    isChecked?: boolean;
    quantity?: number;
    rebate?: number;
}

export interface studentBillResponse extends Response {
    data: {
        debt: number;
        bills: StudentBill[];
    }
}

export interface StoreBill {
    name: string;
    id: number;
    amount: number;
    description: string;


}

export interface GeneralBill {
    name: string;
    id: number;
    amount: number;
    description: string;


}


export interface GeneralBillResponse extends Response {
    data: GeneralBill[];
}

export interface StoreBillResponse extends Response {
    data: StoreBill[];
}

export interface ConpulsoryBillResponse extends Response {
    data: CompulsoryBill[];
}





export interface SchoolBillResponse extends Response {

    data: SchoolBiilData;

}

export interface SchoolBiilData {
    storeBill: StoreBill[];
    GeneralBill: GeneralBill[];
    CompulsoryBiill: CompulsoryBill[];
}
export interface paging {
    count: any;
    data: Student[];
}


export interface login {
    email: string;
    password: string;
}

export interface Search {
    firstname: any;
    lastname: any;
    classid: any;
}

export interface Role {
    id?: number;
    name: string;
    slug?: string;
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id?: number;
    name?: string;
    email: string;
    email_verified_at?: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserPaginate {
    total: any,
    last_page: any,
    current_page: any
    data: User[];
}

export interface UserRoles {
    role: Role;
    pivot: {
        user_id: number;
        role_id: number;
        created_at: string;
        updated_at: string;
    }
}