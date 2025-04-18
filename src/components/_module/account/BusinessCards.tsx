import React from "react";
import { Button } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import BusinessCard from "@/components/_basic/input/BusinessCard";

const BusinessCards = () => {
  const { userStore } = useStore();
  const { businessCards, businessCardsLoading } = userStore;

  const router = useRouter();

  const goToProducts = () => {
    router.push("/products");
  };

  let businessCardsPanel = null;

  if (businessCardsLoading) {
    businessCardsPanel = (
      <div className={styles.wrapper2}>
        <h1>Your Business cards</h1>

        <div className="flex justify-around gap-4 items-center mt-7 px-10">
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
          <Skeleton height="100px" width="200px" />
        </div>
      </div>
    );
  } else {
    businessCardsPanel = (
      <div className={styles.wrapper2}>
        <h1 className="text-center mt-7">Your Business cards</h1>

        {businessCards.length == 0 ? (
          <h2 className="text-center">No cards yet - try ordering some or activating</h2>
        ) : (
          <div
            className={`${styles.servicesTwo} ${businessCards.length < 3 ? `lg:grid-cols-${businessCards.length}` : "lg:grid-cols-2"}`}
          >
            {businessCards.map((card, index) => (
              <BusinessCard key={index} card={card} cardIndex={index} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="text-white">
        <div>
          <p className="py-2">
            Do you want to have a single QR code and be able to change the business card at any time? We provide the
            best solution for you - a dynamic QR code with customizable data. Get one from the
            <Button size="sm" className="btn-light gap-2" onClick={goToProducts}>
              The Product Page
            </Button>{" "}
            or activate the ones you do not see here from the{" "}
            <Button size="sm" variant="solid" onClick={userStore.toggleBusinessCardModal}>
              <i className="mr-2 fa-solid fa-qrcode"></i> Activate
            </Button>{" "}
            button
          </p>
        </div>
      </div>
      {businessCardsPanel}
    </>
  );
};

export default observer(BusinessCards);
