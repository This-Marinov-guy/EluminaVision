import { motion } from "framer-motion";

const ProductsPanel = () => {
  const portfolioItems = [
    {
      title: "Project 1",
      description: "Photography",
      type: "image",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Project 2",
      description: "Video Production",
      type: "video",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Project 3",
      description: "Photography",
      type: "image",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Project 4",
      description: "Video Production",
      type: "video",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Project 5",
      description: "Photography",
      type: "image",
      imageUrl: "/placeholder.svg",
    },
    {
      title: "Project 6",
      description: "Photography",
      type: "image",
      imageUrl: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {item.type === "video" ? (
                  <div className="w-12 h-12 text-white mb-4" />
                ) : (
                  <div className="w-12 h-12 text-white mb-4" />
                )}
                <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-200 mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPanel;
