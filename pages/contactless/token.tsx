import {Col, Form, Input, InputNumber, Row} from 'antd';
import {useEffect} from 'react';
import {ChangeEvent, useCallback, useState} from 'react';
import Page from 'components/shared/Page';
import dynamic from 'next/dynamic';

function buf2hex(buffer: Uint8Array): string {
  return [...buffer]
    .map((x) => x.toString(16).padStart(2, '0').toUpperCase())
    .join(':');
}

function hexStringToUint8(hex: string): Uint8Array {
  return Uint8Array.from(
    Buffer.from(hex.replace(/[^[A-F0-9]/g, '').toLowerCase(), 'hex'),
  );
}

function numberToUint8(n: number): Uint8Array {
  const a = [];
  a.unshift(n & 255);
  while (n >= 256) {
    n = n >>> 8;
    a.unshift(n & 255);
  }
  return new Uint8Array(a.reverse());
}

const ID_LENGTH = 7;
const COUNT_LENGTH = 2;
const DEPOSIT_LENGTH = 1;
const BALANCE_LENGTH = 2;
const SIGNATURE_LENGTH = 5;

function Token() {
  const [balance, setBalance] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [count, setCount] = useState(0);
  const [payloadError, setPayloadError] = useState<string | null>(null);
  const [id, setID] = useState('');
  const [payload, setPayload] = useState('');
  const [salt, setSalt] = useState(window.localStorage.getItem('salt'));
  const [data, setData] = useState<Uint8Array>(
    new Uint8Array(
      ID_LENGTH + // ID
        COUNT_LENGTH + // count
        DEPOSIT_LENGTH + // deposit
        BALANCE_LENGTH + // balance
        SIGNATURE_LENGTH, // signture
    ),
  );
  const [password, setPassword] = useState(new Uint8Array(0));

  useEffect(() => {
    (async () => {
      // calculate signature
      const data = new Uint8Array(
        ID_LENGTH + // ID
          COUNT_LENGTH + // count
          DEPOSIT_LENGTH + // deposit
          BALANCE_LENGTH, // balance
      );
      const idUint8 = hexStringToUint8(id);
      data.set(idUint8); // ID
      let offset = ID_LENGTH;
      data.set(numberToUint8(count), offset); // count
      offset += COUNT_LENGTH;
      data.set(numberToUint8(deposit), offset); // deposit
      offset += DEPOSIT_LENGTH;
      data.set(numberToUint8(balance), offset); // balance

      const saltUint8 = new TextEncoder().encode(salt ?? '');
      const sig = await crypto.subtle.digest(
        'SHA-1',
        new Uint8Array([...data, ...saltUint8]),
      );
      const newData = new Uint8Array([
        ...data,
        ...new Uint8Array(sig).slice(0, SIGNATURE_LENGTH),
      ]);
      setData(newData);

      setPayload(
        Buffer.from(newData.buffer)
          .toString('base64')
          // poor man's base64url, as it's not supported in browsers
          .replaceAll('+', '-')
          .replaceAll('/', '_')
          .replaceAll('=', ''),
      );
      setPayloadError(null);

      const password = await crypto.subtle.digest(
        'SHA-1',
        new Uint8Array([...idUint8, ...saltUint8]),
      );
      setPassword(new Uint8Array(password));
    })();
  }, [salt, deposit, count, balance, id]);

  const onPayloadChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const payload = e.target.value;
      setPayload(payload);
      if (payload.length !== 23) {
        setPayloadError('Wrong payload length');
        return;
      }
      const payloadBuffer = Buffer.from(
        // poor man's base64url, as it's not supported in browsers
        payload.replaceAll('-', '+').replaceAll('_', '/'),
        'base64',
      );
      console.log(buf2hex(payloadBuffer.slice(12)));
      setCount(payloadBuffer.slice(7, 9).readUInt16LE());
      setDeposit(payloadBuffer.slice(9, 10).readUInt8());
      setBalance(payloadBuffer.slice(10, 12).readUInt16LE());
      setID(buf2hex(payloadBuffer.slice(0, 7)));
      setPayloadError(null); // TODO: verify signature
    },
    [setPayload],
  );

  return (
    <Page padded title="Token-Generator">
      <Form labelCol={{span: 4}} wrapperCol={{span: 14}} layout="horizontal">
        <Form.Item label="Salt">
          <Input
            value={salt ?? ''}
            onChange={(e) => setSalt(e.target.value)}
            onBlur={(e) => window.localStorage.setItem('salt', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Card ID">
          <Input
            placeholder="00:00:00:00:00:00:00 (7 bytes)"
            value={id}
            onChange={(e) =>
              setID(
                e.target.value
                  .toUpperCase()
                  .replace(/[^A-F0-9]/g, '')
                  .match(/.{1,2}/g)
                  ?.join(':') ?? '',
              )
            }
            maxLength={20}
            status={id.length > 1 && id.length !== 20 ? 'error' : undefined}
          />
        </Form.Item>
        <Row>
          <Col span={8}>
            <Form.Item label="Balance">
              <InputNumber
                value={balance}
                onChange={(e) => setBalance(e ?? 0)}
                min={0}
                max={65535}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Deposit">
              <InputNumber
                value={deposit}
                onChange={(e) => setDeposit(e ?? 0)}
                min={0}
                max={255}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Count">
              <InputNumber
                value={count}
                onChange={(e) => setCount(e ?? 0)}
                min={0}
                max={65535}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <pre>
        <>
          {buf2hex(data)}
          {'\n'}
          └──────cardID──────┘ └cnt┘ └┘ └bal┘ └──signature─┘
        </>
      </pre>
      <pre>
        <>
          {buf2hex(password).substring(42)}
          {'\n'}
          └PAK┘ └─password┘
        </>
      </pre>

      <Form.Item
        hasFeedback={!!payloadError}
        validateStatus={payloadError ? 'error' : undefined}
        help={payloadError}
      >
        <Input
          prefix="https://kult.cash/$$/"
          value={payload}
          onChange={onPayloadChange}
        />
      </Form.Item>
    </Page>
  );
}

// Disable SSR, because localStorage is used
export default dynamic(() => Promise.resolve(Token), {
  ssr: false,
});
