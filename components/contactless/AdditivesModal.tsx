import {Checkbox, Modal} from 'antd';
import {gql} from '@apollo/client';
import {useProductAdditivesQuery} from 'types/graphql';

gql`
  query ProductAdditives {
    productAdditives {
      id
      displayName
    }
  }
`;

export default function AdditivesModal(props: {
  isOpen: boolean;
  onClose: () => void;
  onChange: (additives: string[]) => void;
  selectedIDs: string[];
}) {
  const {data} = useProductAdditivesQuery();
  return (
    <Modal
      title="Zusatzstoffe und Allergene"
      open={props.isOpen}
      onCancel={() => props.onClose()}
      footer={null}
    >
      {data?.productAdditives.map((additive) => (
        <li key={additive.id}>
          <Checkbox
            defaultChecked={props.selectedIDs.some((id) => id === additive.id)}
            onChange={(e) => {
              props.onChange(
                e.target.checked
                  ? [...props.selectedIDs, additive.id]
                  : props.selectedIDs.filter((id) => id !== additive.id),
              );
            }}
          >
            {additive.displayName}
          </Checkbox>
        </li>
      ))}
    </Modal>
  );
}
