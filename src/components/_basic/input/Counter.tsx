import { motion } from "framer-motion";

const Counter = ({ value, setValue, isInput = false }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/\D/, ""); // Remove non-numeric input
    setValue(newValue === "" ? 0 : parseInt(newValue, 10));
  };

  return (
    <div className="flex items-center space-x-2 p-1 rounded-lg">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-gray-800"
        onClick={() => setValue(Math.max(value - 1, 0))}
      >
        <i className="fa-solid fa-arrow-down"></i>
      </motion.button>

      {isInput ? (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={() => setValue(value || 1)} // Prevent empty input
          className="w-10 text-center text-xl bg-transparent border border-gray-300 rounded-md"
        />
      ) : (
        <span className="text-black text-xl">{value}</span>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-gray-800"
        onClick={() => setValue(value + 1)}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </motion.button>
    </div>
  );
};

export default Counter;
