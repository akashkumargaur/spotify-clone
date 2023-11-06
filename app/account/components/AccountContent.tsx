"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";
// import { postData } from "@/libs/helpers";
import Button from "@/components/button";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);


  return ( 
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
        <p>No active plan.</p>
        <Button 
          onClick={subscribeModal.onOpen}
          className="w-[300px]"
        >
          Subscribe
        </Button>
      </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>You are currently on the 
            <b> {subscription?.prices?.products?.name} </b> 
            plan.
          </p>
          <div className="text-neutral-400 text-4xl">
            Injoy Free Songs . Dear {user?.email}
          </div>
        </div>
      )}
    </div>
  );
}
 
export default AccountContent;
