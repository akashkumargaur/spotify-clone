export interface UserDetails{
    id:string;
    first_name:string;
    last_name?:string;
    full_naem?:string;
    billing_address?:string;
    payment_method?:string;
}

export interface Customer {
    id: string;
    stripe_customer_id?: string;
}

export interface Song {
    id:string;
    user_id:string;
    author:string;
    title:string;
    song_path:string;
    image_path:String;
    playlist_name:String;
}

export interface Product {
    id:string;
    active?:boolean;
    name?:string;
    description?:string;
    image?:string;
    metadata?:string;
}

export interface Price{
    id:string;
    product_id?:string;
    active?:boolean;
    description?:string;
    unit_amount?:number;
    currency?:string;
    type?:string;
    interval?:string;
    interval_count?:number;
    trial_period_days?:number | null;
    metadata?:string;
    products?:Product;
}

export interface ProductWithPrice extends Product {
    prices?: Price[];
}
  
export interface Subscription {
    id:string;
    user_id:string;
    status?:string;
    metadata?:string;
    price_id?:string;
    quality?:number;
    cancel_at_period_end?:boolean;
    created:string;
    current_period_start:string;
    current_period_end:string;
    ended_At?:string;
    cancel_at?:string;
    canceled_at?:string;
    trail_start?:string;
    trail_end?:string;
    prices?:Price;
}