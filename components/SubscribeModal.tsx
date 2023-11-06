"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import uniqid from "uniqid";

import { useUser } from '@/hooks/useUser';
// import { postData } from '@/libs/helpers';
// import { getStripe } from '@/libs/stripeClient';
import { Price, ProductWithPrice } from '@/types';

import Modal from './Modal';
import Button from './button';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import Input from './input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) );

  return priceString;
};


const SubscribeModal: React.FC<SubscribeModalProps> = ({
  products
}) => {
  const subscribeModal = useSubscribeModal ();
  const { user, isLoading, subscription } = useUser();
  const [value, setValue] = useState<string>('');
  const supabase = createClientComponentClient<Database>()
  const router=useRouter();
  

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  }

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error('Must be logged in');
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast('Already subscribed');
    }

    if(value!='akashisthebestcoderiknow'){
      setPriceIdLoading(undefined);
      return toast.error('enter Correct Referal Code');
    }
    const uniqId=uniqid();

    const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      { id:uniqId,user_id: user.id, status: 'active',price_id:price.id,quantity:1,cancel_at_period_end:true },
    ])
    .select()

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
    }
    setValue('')
    setPriceIdLoading(undefined);
    router.push('/account');
    subscribeModal.onClose();
    window.location.reload();
  };

  let content = (
    <div className="text-center">
      No products available.
    </div>
  )

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return (
              <div key={product.id}>
                No prices available
              </div>
            );
          }

          return product.prices.map((price) => (
            <>
                <div className="mb-2 flex flex-col gap-y-6">
                  <h1 className="text-white text-2xl font-semibold">
                    Referal code: akashisthebestcoderiknow 😉😏
                  </h1>
                </div>
                <Input 
                  placeholder="Referal code: without emoji"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              <Button 
                key={price.id} 
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className="mb-4 mt-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            </>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = (
      <div className="text-center">
        Already subscribed.
      </div>
    )
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
}

export default SubscribeModal;