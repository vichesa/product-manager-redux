import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  productSelector,
  updateProducts,
} from '../features/productSlice';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [qty, setQty] = useState();
  const [picture, setPicture] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [isActive, setIsActive] = useState(true);

  const { id } = useParams();

  const product = useSelector((state) => productSelector.selectById(state, id));

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setQty(product.qty);
      setPicture(product.picture);
      setExpiredAt(product.expiredAt);
      setIsActive(product.isActive);
    }
  }, [product]);

  const editProduct = async (e) => {
    e.preventDefault();
    await dispatch(updateProducts({ name, qty, picture, expiredAt, isActive }));
    navigate('/');

    console.log(product);
  };

  return (
    <div>
      <form className="box mt-5" onSubmit={editProduct}>
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
          <input
            className="checkbox"
            checked={isActive}
            placeholder="Ready Stock"
          />
          <button className="button is-primary mt-5">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
