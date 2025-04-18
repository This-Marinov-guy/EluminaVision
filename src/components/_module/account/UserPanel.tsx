import { useStore } from "@/stores/storeProvider";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import PageSectionHeading from "../../_basic/heading";
import PageContainer from "../container";
import { observer } from "mobx-react-lite";
import { Button } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import ActivateQRCode from "@/components/_basic/modals/ActivateQRCode";
import QRcodes from "./QRcodes";
import BusinessCards from "./BusinessCards";
import ActivateBusinessCard from "@/components/_basic/modals/ActivateBusinessCard";

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const UserPanel = () => {
  const { userStore } = useStore();
  const { user } = userStore;
  const router = useRouter();
  const [tabIndex, setTabIndex] = React.useState(0);

  const goToProducts = () => {
    router.push("/products");
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <section id="service" className={styles.wrapper}>
      <ActivateQRCode />
      <ActivateBusinessCard />
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <PageContainer>
          <PageSectionHeading
            title="Welcome"
            slogan={user?.email}
            button={
              <Button style={{ minWidth: "100px" }} colorScheme="red" variant="solid" onClick={userStore.signOut}>
                {/* <i className="mr-2 fa-solid fa-door-open"></i>  */}
                Log out
              </Button>
            }
          />
          <Tabs className="mt-5" isFitted variant="enclosed" index={tabIndex} onChange={handleTabChange}>
            <TabList mb="1em">
              <Tab className="btn-light-ghost">QR dynamic codes</Tab>
              <Tab className="btn-light-ghost">QR business card</Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding={0}>
                <AnimatePresence mode="wait">
                  {tabIndex === 0 && (
                    <motion.div
                      key="qrcodes"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabContentVariants}
                    >
                      <QRcodes />
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabPanel>
              <TabPanel padding={0}>
                <AnimatePresence mode="wait">
                  {tabIndex === 1 && (
                    <motion.div
                      key="businesscards"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabContentVariants}
                    >
                      <BusinessCards />
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PageContainer>
      </motion.div>
    </section>
  );
};

export default observer(UserPanel);
