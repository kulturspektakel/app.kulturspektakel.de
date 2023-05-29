import styles from './ProductRow.module.css';
import {Checkbox, Input, Tooltip} from 'antd';
import React, {useRef} from 'react';
import {gql} from '@apollo/client';
import {ProductRowFragment} from '../../types/graphql';

gql`
  fragment ProductRow on Product {
    id
    name
    price
    requiresDeposit
  }
`;

type Props = {
  index: number;
  data: ProductRowFragment;
  onChange: (i: number, newProduct: Partial<ProductRowFragment>) => void;
};
type Ref = HTMLLIElement;

const formatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ProductRow = React.forwardRef<Ref, Props>(
  ({data, index, onChange, ...props}: Props, ref) => {
    const inputRef = useRef(null);
    return (
      <li className={styles.root} ref={ref} {...props}>
        <span className={styles.index}>{index}</span>
        <Input
          value={data.name ?? ''}
          maxLength={30}
          onChange={(e) => {
            onChange(index - 1, {name: e.target.value});
          }}
        />
        &nbsp;
        <Input
          ref={inputRef}
          inputMode="decimal"
          defaultValue={
            data.price ? formatter.format(data.price / 100) : undefined
          }
          onBlur={(e) => {
            let newPrice = Math.floor(
              parseFloat((e.target.value || '0').replace(/,/g, '.')) * 100,
            );
            if (newPrice > 9999) {
              newPrice = 9999;
            }
            if (newPrice === data.price) {
              return;
            }
            onChange(index - 1, {price: newPrice});
          }}
          style={{width: '115px'}}
          min={0}
          max={9999}
          suffix={data.price ? `€` : ''}
        />
        <Tooltip title="Pfand">
          <Checkbox
            className={styles.deposit}
            checked={data.requiresDeposit}
            onChange={(e) =>
              onChange(index - 1, {requiresDeposit: e.target.checked})
            }
          />
        </Tooltip>
      </li>
    );
  },
);

ProductRow.displayName = 'ProductRow';

export default ProductRow;
