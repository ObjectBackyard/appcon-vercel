import { CardStack } from "./card-stack.tsx";

export function Messages(id) {


  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={generateCards()} />
    </div>
  );
}

function generateCards() {
  const cards = transactions.map((transaction, index) => ({
    id: index,
    name: transaction.sender_name,
    donation: "Donor", // Assuming sender is always a donor
    content: transaction.message,
  }));
  return cards;
}

const transactions = [
  {
    _id: {
      $oid: "6625a270fc13222200000001",
    },
    transaction_hash:
      "0x4b411abba0333200b004b47ab85f3dac2339032f08168fe05486159a592036e3",
    amount_paid: 20,
    message: "Cheers!",
    date_created: {
      $date: "2024-03-01T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000010",
    },
    destination_id: {
      $oid: "6625a122fc13111100000001",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000001",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000002",
    },
    transaction_hash:
      "0x56224f8ffbeee2c5bc77418e1fe204d2b62f8f755d3bbb36ee3386012c10e8f3",
    amount_paid: 100,
    message: "👾 🙇 💁 🙅 🙆 🙋 🙎 🙍 ",
    date_created: {
      $date: "2024-03-02T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000009",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000002",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000002",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000003",
    },
    transaction_hash:
      "0x16f3dbcbc6430c7b3516108da7825d73e056364df42025166efb26891667cb20",
    amount_paid: 200,
    message: "integer ac neque duis bibendum morbi",
    date_created: {
      $date: "2024-03-03T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000010",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000002",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000002",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000004",
    },
    transaction_hash:
      "0xd5f51747742d7fd1b6e7056f775638a57293d2e3a562aa54f53e6648259d6e8b",
    amount_paid: 1000,
    message: "和製漢語",
    date_created: {
      $date: "2024-03-04T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000005",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000005",
    },
    transaction_hash:
      "0xd7f0e5638095f9d1e573529eba0223a38fd54faffd50d19c574052ef07d1fec2",
    amount_paid: 5000,
    message:
      "ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla",
    date_created: {
      $date: "2024-03-05T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000005",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000006",
    },
    transaction_hash:
      "0x0d3ce4c8bcfa78307ea61179cb81f2892ecb5f6abf8d3f38ada067e69b159298",
    amount_paid: 75,
    message:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi nec condimentum neque sapien placerat ante. Nulla justo.",
    date_created: {
      $date: "2024-03-06T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000005",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000007",
    },
    transaction_hash:
      "0x949f8b740a283366aeac4209cb2cd480f0ef526ed3a91f7fb0d49e39674c533d",
    amount_paid: 150,
    message: "Good luck!",
    date_created: {
      $date: "2024-03-07T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000005",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000008",
    },
    transaction_hash:
      "0x9b0918460ff0b127e61a0520a8d1ece9f74215ef7727878c12844cb8af9ff8a4",
    amount_paid: 3000,
    message:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est!",
    date_created: {
      $date: "2024-03-08T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000005",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000009",
    },
    transaction_hash:
      "0x0b7d48878a2072102993c6b1c78b993dcebe9c99177e7092da47893dd8ac1248",
    amount_paid: 3500,
    message: "🚾 🆒 🆓 🆕 🆖 🆗 🆙 🏧",
    date_created: {
      $date: "2024-03-09T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000005",
    },
  },
  {
    _id: {
      $oid: "6625a270fc13222200000010",
    },
    transaction_hash:
      "0x08f608b2ac935ad0a8cc2ad4cb3d594cdf99ee61d46ab189546f91a6fc47e095",
    amount_paid: 2000,
    message:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum",
    date_created: {
      $date: "2024-03-10T12:17:14.000Z",
    },
    source_id: {
      $oid: "6625a122fc13a11110000002",
    },
    destination_id: {
      $oid: "6625a122fc13a11110000010",
    },
    cause_id: {
      $oid: "6625a4f3fc13333300000010",
    },
  },
];
