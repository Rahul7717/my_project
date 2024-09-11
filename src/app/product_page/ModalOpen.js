const ModalOpen = ({ isModalOpen, ProductModal, selectedProduct, closeModal, productQuantities, onQuantityChange }) => {
  if (!isModalOpen) return null;
  
  return (
    <ProductModal 
      product={selectedProduct}
      onClose={closeModal}
      quantity={productQuantities[selectedProduct?.id] || 0} 
      onQuantityChange={onQuantityChange} 
    /> 
  );
}

export default ModalOpen;


