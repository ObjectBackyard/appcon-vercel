import { cn } from "../../utils/cn.ts";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid.tsx";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconTallymark1,
  IconTallymark2,
  IconTallymark3,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../App.js";

export function BentoGridDemo() {
  const [mode, setMode] = useState("recent"); // State to track mode: "recent" or "urgent"
  const [displayItems, setDisplayItems] = useState([]); // State to track items to display

  useEffect(() => {
    // setDisplayItems((await Axios.get('https://akap-api.vercel.app/api/get-all-causes')).data.data);
    axios
      .get(`${URL}/api/get-all-causes`)
      .then((response) => {
        setDisplayItems(response.data.data);
        console.log(response.data.data);
        let item = response.data.data;
        if (mode === "recent") {
          setDisplayItems(item.slice(0, 5)); // Display the most recent 6 items
        } else if (mode === "urgent") {
          const sortedItems = [...item].sort((a, b) => {
            // Sort items by urgency
            const urgencyOrder = { Low: 1, Middle: 2, High: 3 };
            return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
          });
          setDisplayItems(sortedItems.slice(0, 5)); // Display the most urgent 6 items
        }
      });

    // console.log(displayItems, "yeeey")
    // Function to update displayItems based on mode
  }, [mode]); // Re-run when mode changes

  return (
    <div className="max-w-4xl mx-auto">
      {/* Buttons for switching modes */}
      <div className="flex justify-center space-x-4 my-4">
        <button
          className={cn(
            "px-4 py-2 rounded-full focus:outline-none",
            mode === "recent" ? "bg-blue-600 text-white" : "bg-gray-200"
          )}
          onClick={() => {setMode("recent")
        console.log("hiii")}
        }
        >
          Recent
        </button>
        <button
          className={cn(
            "px-4 py-2 rounded-full focus:outline-none",
            mode === "urgent" ? "bg-blue-600 text-white" : "bg-gray-200"
          )}
          onClick={() => {setMode("urgent")
          console.log("hiii")}
          }
        >
          Most Urgent
        </button>
      </div>

      {/* BentoGrid to display items */}
      <BentoGrid>
        
        {displayItems.map((item, i) => {
          return (<BentoGridItem
            key={i}
            title={item.title}
            description={item.post_content}
            header={<Skeleton imageUrl={item.images[0]} />}
            urgency={item.urgency}
            id = {item._id} 
            
            className={i === 3 || i === 6 ? "md:col-span-2" : ""  
          }
          
         
          />)
      })}
      </BentoGrid>
    </div>
  );
}

const Skeleton = ({ imageUrl }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
    <img
      src={imageUrl}
      alt="Skeleton"
      className="w-full h-full object-cover rounded-md"
    />
  </div>
);

const items = [
  {
    _id: {
      $oid: "6625a4f3fc13333300000001",
    },
    goal_amount: 30000,
    user_id: {
      $oid: "6625a122fc13111100000001",
    },
    title: "integer ac neque duis bibendum morbi",
    post_content:
      "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    date_created: {
      $date: "2024-02-01T12:17:14.000Z",
    },
    urgency: "Middle",
    type: "Veterinary Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000002",
    },
    goal_amount: 27000,
    user_id: {
      $oid: "6625a122fc13a11110000002",
    },
    title: "et ultrices posuere cubilia curae mauris viverra",
    post_content:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    date_created: {
      $date: "2024-02-02T12:17:14.000Z",
    },
    urgency: "Low",
    type: "Displacement",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000003",
    },
    goal_amount: 9500,
    user_id: {
      $oid: "6625a122fc13a11110000003",
    },
    title: "id turpis integer",
    post_content:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    date_created: {
      $date: "2024-02-03T12:17:14.000Z",
    },
    urgency: "Low",
    type: "Displacement",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000004",
    },
    goal_amount: 13000,
    user_id: {
      $oid: "6625a122fc13a11110000007",
    },
    title: "sed interdum venenatis turpis",
    post_content:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    date_created: {
      $date: "2024-02-04T12:17:14.000Z",
    },
    urgency: "Middle",
    type: "Medical Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000005",
    },
    goal_amount: 18000,
    user_id: {
      $oid: "6625a122fc13a11110000010",
    },
    title: "cum sociis natoque penatibus",
    post_content:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    date_created: {
      $date: "2024-02-05T12:17:14.000Z",
    },
    urgency: "Middle",
    type: "Medical Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000006",
    },
    goal_amount: 20000,
    user_id: {
      $oid: "6625a122fc13a11110000010",
    },
    title: "non mauris morbi",
    post_content:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    date_created: {
      $date: "2024-02-06T12:17:14.000Z",
    },
    urgency: "Middle",
    type: "Medical Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
    ],
    existence_status: "Deleted",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000007",
    },
    goal_amount: 8600,
    user_id: {
      $oid: "6625a122fc13a11110000010",
    },
    title: "eu orci mauris lacinia sapien quis libero nullam",
    post_content:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    date_created: {
      $date: "2024-02-07T12:17:14.000Z",
    },
    urgency: "High",
    type: "Medical Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000008",
    },
    goal_amount: 3000,
    user_id: {
      $oid: "6625a122fc13a11110000010",
    },
    title: "blandit mi in",
    post_content:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    date_created: {
      $date: "2024-02-08T12:17:14.000Z",
    },
    urgency: "High",
    type: "Medical Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000009",
    },
    goal_amount: 9200,
    user_id: {
      $oid: "6625a122fc13a11110000010",
    },
    title: "mauris ullamcorper purus",
    post_content:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    date_created: {
      $date: "2024-02-09T12:17:14.000Z",
    },
    urgency: "Low",
    type: "Veterinary Bills",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
    ],
    existence_status: "Active",
  },
  {
    _id: {
      $oid: "6625a4f3fc13333300000010",
    },
    goal_amount: 2300,
    user_id: {
      $oid: "6625a122fc13a11110000010",
    },
    title: "quam nec dui",
    post_content:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    date_created: {
      $date: "2024-02-10T12:17:14.000Z",
    },
    urgency: "High",
    type: "Displacement",
    images: [
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-5.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-2.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677443/cld-sample-3.jpg",
      "https://res.cloudinary.com/dwb0cfoc3/image/upload/v1713677444/cld-sample-4.jpg",
    ],
    existence_status: "Active",
  },
];
