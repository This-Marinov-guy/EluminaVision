import { useStore } from "@/stores/storeProvider";
import React from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import PageSectionHeading from "../../_basic/heading";
import PageContainer from "../container";
import { observer } from "mobx-react-lite";
import { Button } from "@chakra-ui/react";
import { Input, Kbd } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const UserPanel = () => {
  const { userStore } = useStore();
  const { user } = userStore;
  const router = useRouter();

  const goToProducts = () => {
    router.push("/products");
  };

  return (
    <section id="service" className={styles.wrapper}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <PageContainer>
          <div className="flex items-center justify-between">
            <PageSectionHeading title="Welcome back" slogan={user?.email} />
            <Button style={{ zIndex: "999" }} colorScheme="red" variant="solid" onClick={userStore.signOut}>
              {/* <i className="mr-2 fa-solid fa-door-open"></i>  */}
              Log out
            </Button>
          </div>
          <div className="text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl mt-10 mb-3">QR codes panels</h2>
            </div>
            <div>
              <p>
                Qr codes are a wonderful way to share links quickly and in style. We bring more by making them dynamic -
                you control what the link is while the image never changes. You can order more codes from{" "}
                <Button size="sm" className="btn-light gap-2" onClick={goToProducts}>
                  The Product Page
                </Button>{" "}
                or activate the ones you do not see here from the{" "}
                <Button size="sm" variant="solid" onClick={userStore.signOut}>
                  <i className="mr-2 fa-solid fa-qrcode"></i> Activate
                </Button>{" "}
                button
              </p>
            </div>
          </div>
          <div className={styles.services}></div>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default observer(UserPanel);
