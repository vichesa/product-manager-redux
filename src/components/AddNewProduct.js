import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productSelector, saveProducts } from '../features/productSlice';
import { useNavigate } from 'react-router';

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [qty, setQty] = useState();
  const [picture, setPicture] = useState('');
  const [expiredAt, setExpiredAt] = useState('');

  const products = useSelector(productSelector.selectAll);

  const id = products[products.length].id + 1;
  const isActive = true;

  const createProduct = async (e) => {
    e.preventDefault();
    await dispatch(
      saveProducts({ name, qty, picture, expiredAt, isActive, id })
    );
    navigate('/');
  };

  return (
    <div>
      <h1>gtuygjh</h1>
      <form className="box mt-5" onSubmit={createProduct}>
        <div className="field">
          <label className="label">Name of Product</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label">Quantity</label>
          <input
            className="input"
            type="text"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <label className="label">Image link</label>
          <input
            className="input"
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <label className="label">Expired Date</label>
          <input
            className="input"
            type="text"
            value={expiredAt}
            onChange={(e) => setExpiredAt(e.target.value)}
          />
          <button className="button is-primary mt-5">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
