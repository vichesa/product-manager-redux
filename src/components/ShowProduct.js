import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, productSelector } from '../features/productSlice';

const ShowProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(productSelector.selectAll);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  return (
    <div className="box mt-5">
      <div className="table is-striped is-fullwidth">
        <Link to="add" className="button is-success">
          Add Product
        </Link>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Picture</th>
            <th>Expired Date</th>
            <th>Ready Stoct</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.qty}</td>
              <td>
                <img src="{product.picture}" alt="product" />
              </td>
              <td>{product.expiredAt}</td>
              <td>
                <input type="checkbox" checked={product.isActive} />
              </td>
              <td>
                <Link
                  to={`edit/$product.id`}
                  className="button is-info is-small"
                >
                  Edit
                </Link>
                <button className="button is-danger is-small">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default ShowProduct;
