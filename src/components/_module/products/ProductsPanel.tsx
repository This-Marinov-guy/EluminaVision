import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge, Button, Card, CardBody, CardHeader, HStack, Image } from "@chakra-ui/react";
import PageSectionHeading from "../../_basic/heading";
import PageContainer from "../container";
import styles from "./style.module.scss";
import { Skeleton } from "@chakra-ui/react";
import { getCurrencySymbol } from "@/utils/helpers";
import { NFC_GOOGLE_CARDS, QR_CODES_VARIANTS } from "@/utils/products";
import { useStore } from "@/stores/storeProvider";
import { observer } from "mobx-react-lite";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
};

const ProductsPanel = () => {
  const { cartStore, commonStore } = useStore();
  const { loading } = commonStore;
  const { totalItems, toggleCartModal, goToCheckout } = cartStore;
  const [showQrProducts, setShowQrProducts] = useState(false);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [quantities, setQuantities] = useState(NFC_GOOGLE_CARDS.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const addItemsToCart = (item) => {
    cartStore.addItem(item, 1);

    // const quantity = quantities[item.id]; // Get the counter value
    // if (quantity > 0) {
    //   cartStore.addItem(item, quantity);
    // }
  };

  useEffect(() => {
    const checkQRcodesAvailability = async () => {
      try {
        const response = await axios.get("/api/qr-codes/availability");

        if (response.data.exists) {
          setShowQrProducts(true);
        }
      } catch (error) {
        // do nothing
      } finally {
        setLoadingProducts(false);
      }
    };

    checkQRcodesAvailability();
  }, []);

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
          <PageSectionHeading title="NFC Google review card" slogan="Get a headstart in the digital world" />
          <div className="text-white">
            <h2 className="text-xl mt-10 mb-3">How to use it</h2>
            <ul>
              <li>1. Log in to your Google Business Profile.</li>
              <li>
                2. Search for your business on Google, and click on the link displaying your current number of reviews.
              </li>
              <li>3. Select the "Get more reviews" button to generate your unique Google review link.</li>
              <li>
                4. Copy the link. Next, download the NFC Tools app from the Apple Store or Google Play Store, and follow
                the on-screen instructions to set up your NFC review card
              </li>
              
            </ul>
          </div>
          <div className={styles.services}>
            {NFC_GOOGLE_CARDS.map((item) => (
              <Card key={item.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="xl">
                <Image src={item.imageUrl} alt={item.title} />
                <CardBody className="flex flex-col items-center justify-center gap-2">
                  <Badge
                    className="absolute top-1 right-1 text-white text-sm p-2 rounded-full"
                    style={{ scale: "1.3" }}
                    colorScheme="blue"
                  >
                    {getCurrencySymbol(item.currency)}
                    {item.price}
                  </Badge>

                  <CardHeader fontSize="lg" fontWeight="bold">
                    {item.variant}
                  </CardHeader>

                  <p>{item.description}</p>

                  <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
                    <Button className={"btn-light"} onClick={() => addItemsToCart(item)}>
                      Add to cart
                    </Button>
                  </motion.button>
                  {/* {item.limit && <small className="text-black mt-3">*limited to {item.limit} per purchase</small>} */}
                </CardBody>
              </Card>
            ))}
            {loadingProducts && <Skeleton height="220px" width="390px" />}
          </div>

          {totalItems > 0 && (
            <motion.button
              className="m-auto flex justify-center gap-3"
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button disabled={loading} className="btn-light gap-2" onClick={toggleCartModal}>
                Go to Cart <i className="fa-solid fa-cart-arrow-down"></i>
              </Button>
              <Button disabled={loading} className="btn-dark gap-2" onClick={goToCheckout}>
                Go to Checkout<i className="fa-solid fa-basket-shopping"></i>
              </Button>
            </motion.button>
          )}
        </PageContainer>
      </motion.div>

      {showQrProducts && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <PageContainer>
            <PageSectionHeading title="Dynamic QR codes" slogan="One code - unlimited link possibilities" />
            <div className="text-white">
              <h2 className="text-xl mt-10 mb-3">How to use it</h2>
              <ul>
                <li>1. Create an account in our platform.</li>
                <li>
                  2. If you have purchased the code while logged in, the code will automatically appear in your account.
                  If you were not in your account, activated the code with the provided id in the confirmation email.
                </li>
                <li>3. Adjust the link by your preference - the updates are instant 🚀.</li>
                <li>4. Share the code with everybody.</li>
              </ul>
            </div>
            <div className={styles.services}>
              {QR_CODES_VARIANTS.map((item) => (
                <Card key={item.id} className={styles.card} flexDirection="row" overflow="hidden" maxW="xl">
                  <Image src={item.imageUrl} alt={item.title} />
                  <CardBody className="flex flex-col items-center justify-center gap-2">
                    <Badge
                      className="absolute top-1 right-1 text-white text-sm p-2 rounded-full"
                      style={{ scale: "1.3" }}
                      colorScheme="blue"
                    >
                      {getCurrencySymbol(item.currency)}
                      {item.price}
                    </Badge>

                    <CardHeader fontSize="lg" fontWeight="bold">
                      {item.variant}
                    </CardHeader>

                    <p>{item.description}</p>

                    <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
                      <Button className={"btn-light"} onClick={() => addItemsToCart(item)}>
                        Add to cart
                      </Button>
                    </motion.button>
                    {/* {item.limit && <small className="text-black mt-3">*limited to {item.limit} per purchase</small>} */}
                  </CardBody>
                </Card>
              ))}
              {loadingProducts && <Skeleton height="220px" width="390px" />}
            </div>

            {totalItems > 0 && (
              <motion.button
                className="m-auto flex justify-center gap-3"
                initial={{ scale: 0, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button disabled={loading} className="btn-light gap-2" onClick={toggleCartModal}>
                  Go to Cart <i className="fa-solid fa-cart-arrow-down"></i>
                </Button>
                <Button disabled={loading} className="btn-dark gap-2" onClick={goToCheckout}>
                  Go to Checkout<i className="fa-solid fa-basket-shopping"></i>
                </Button>
              </motion.button>
            )}
          </PageContainer>
        </motion.div>
      )}
    </section>
  );
};

export default observer(ProductsPanel);
