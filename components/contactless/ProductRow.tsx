import styles from './ProductRow.module.css';
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Popconfirm,
  Switch,
  Tooltip,
} from 'antd';
import React, {useRef, useState} from 'react';
import {gql} from '@apollo/client';
import {ProductRowFragment} from '../../types/graphql';
import AdditivesModal from './AdditivesModal';

gql`
  fragment ProductRow on Product {
    id
    name
    price
    requiresDeposit
    additives {
      id
    }
  }
`;

type Props = {
  index: number;
  data: ProductRowFragment;
  onChange: (i: number, newProduct: Partial<ProductRowFragment> | null) => void;
};
type Ref = HTMLLIElement;

const formatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ProductRow = React.forwardRef<Ref, Props>(
  ({data, index, onChange, ...props}: Props, ref) => {
    const inputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <li className={styles.root} ref={ref} {...props}>
        <AdditivesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChange={(additives) =>
            onChange(index - 1, {additives: additives.map((id) => ({id}))})
          }
          selectedIDs={data.additives.map(({id}) => id)}
        />
        <div className={styles.index}>{index}</div>

        <div className={styles.container}>
          <div className={styles.row}>
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
          </div>
          <div>
            <Checkbox
              style={{marginTop: 3}}
              className={styles.deposit}
              defaultChecked={data.requiresDeposit}
              onChange={(e) =>
                onChange(index - 1, {requiresDeposit: e.target.checked})
              }
            >
              Pfand
            </Checkbox>
            &nbsp;
            <Button
              type="link"
              size="small"
              onClick={() => setIsModalOpen(true)}
            >
              {data.additives.length} Zusatzstoff
              {data.additives.length !== 1 ? 'e' : ''}
            </Button>
            &nbsp;
            <Popconfirm
              title={`${data.name} entfernen`}
              description="Soll das Produkt von der Preisliste entfernt werden?"
              onConfirm={() => {
                onChange(index - 1, null);
              }}
              okText="Entfernen"
              cancelText="Abbrechen"
            >
              <Button type="link" size="small" danger>
                Entfernen
              </Button>
            </Popconfirm>
          </div>
        </div>
      </li>
    );
  },
);

ProductRow.displayName = 'ProductRow';

export default ProductRow;
