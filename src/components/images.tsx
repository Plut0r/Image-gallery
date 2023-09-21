import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const images: {
  id: number;
  tag: string;
  path: string;
  gridPlacement: {
    colStart: number;
    colEnd: number;
    rowStart: number;
    rowEnd: number;
  };
}[] = [
  {
    id: 0,
    tag: "nature",
    path: "/image A.jpg",
    gridPlacement: {
      colStart: 1,
      colEnd: 3,
      rowStart: 1,
      rowEnd: 3,
    },
  },
  {
    id: 1,
    tag: "nature",
    path: "/image B.jpg",
    gridPlacement: {
      colStart: 3,
      colEnd: 7,
      rowStart: 1,
      rowEnd: 3,
    },
  },
  {
    id: 2,
    tag: "vehicles",
    path: "/image C.jpg",
    gridPlacement: {
      colStart: 1,
      colEnd: 3,
      rowStart: 3,
      rowEnd: 5,
    },
  },
  {
    id: 3,
    tag: "drinks",
    path: "/image D.jpg",
    gridPlacement: {
      colStart: 3,
      colEnd: 5,
      rowStart: 3,
      rowEnd: 5,
    },
  },
  {
    id: 4,
    tag: "nature",
    path: "/image E.jpg",
    gridPlacement: {
      colStart: 5,
      colEnd: 7,
      rowStart: 3,
      rowEnd: 5,
    },
  },
  {
    id: 5,
    tag: "nature",
    path: "/image F.jpg",
    gridPlacement: {
      colStart: 7,
      colEnd: 9,
      rowStart: 1,
      rowEnd: 7,
    },
  },
  {
    id: 6,
    tag: "beams",
    path: "/image G.jpg",
    gridPlacement: {
      colStart: 1,
      colEnd: 5,
      rowStart: 5,
      rowEnd: 7,
    },
  },
  {
    id: 7,
    tag: "lady",
    path: "/image H.jpg",
    gridPlacement: {
      colStart: 5,
      colEnd: 7,
      rowStart: 5,
      rowEnd: 7,
    },
  },
  {
    id: 8,
    tag: "nature",
    path: "/image I.jpg",
    gridPlacement: {
      colStart: 1,
      colEnd: 3,
      rowStart: 7,
      rowEnd: 9,
    },
  },
  {
    id: 9,
    tag: "vehicles",
    path: "/image J.jpg",
    gridPlacement: {
      colStart: 3,
      colEnd: 5,
      rowStart: 7,
      rowEnd: 9,
    },
  },
  {
    id: 10,
    tag: "snow flakes",
    path: "/image K.jpg",
    gridPlacement: {
      colStart: 5,
      colEnd: 7,
      rowStart: 7,
      rowEnd: 9,
    },
  },
  {
    id: 11,
    tag: "nature",
    path: "/image L.jpg",
    gridPlacement: {
      colStart: 7,
      colEnd: 9,
      rowStart: 7,
      rowEnd: 9,
    },
  },
];

interface Images {
  isLoggedIn: boolean;
}

function Images({ isLoggedIn }: Images) {
  const [galleryImages, setGalleryImages] = useState(images);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<any[]>(Array(12).fill(true));

  const filteredImages = galleryImages.filter((image) =>
    image.tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageLoad = (index: number) => {
    setIsLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // Return if dropped outside the droppable area

    const { source, destination } = result;
    const updatedImages = Array.from(galleryImages);
    const [draggedImage] = updatedImages.splice(source.index, 1);
    updatedImages.splice(destination.index, 0, draggedImage);

    setGalleryImages(updatedImages);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row gap-y-2 md:items-center md:justify-between">
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start">
          <h3 className="text-green-800 font-bold text-lg">Photos</h3>
          {!isLoggedIn && (
            <p className="text-xs md:text-sm text-gray-500">
              Kindly login to use drag and drop
            </p>
          )}
        </div>
        <div className="w-full md:w-60 h-10 rounded-lg border border-gray-400 flex justify-between items-center px-2">
          <input
            type="text"
            className="outline-none w-[90%] md:w-48 bg-transparent placeholder:text-xs text-xs"
            placeholder="Search by image tag"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <BsSearch color="gray" />
        </div>
      </div>
      <div className="w-full">
        {isLoggedIn ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="image-gallery">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid md:grid-cols-4 gap-3 w-full mt-6 overflow-hidden"
                >
                  {filteredImages?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative h-[289px] col-span-1 grid-flow-col-dense z-10`}
                        >
                          {isLoading[item.id] ? (
                            <Skeleton className="w-full h-full" />
                          ) : null}
                          <img
                            src={item.path}
                            alt=""
                            className={`h-full w-full object-cover absolute top-0 left-0 bottom-0 right-0 ${
                              isLoading[item.id] ? "hidden" : ""
                            }`}
                            onLoad={() => handleImageLoad(item.id)}
                          />
                          <div className="absolute bottom-2 left-2 bg-[#b3b3b3] text-white p-1 rounded-lg text-xs">
                            {item.tag}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 w-full mt-6">
            {filteredImages?.map((item) => (
              <div key={item.id} className={`relative h-[150px] md:h-[289px]`}>
                {isLoading[item.id] ? (
                  <Skeleton className="w-full h-full" />
                ) : null}
                <img
                  src={item.path}
                  alt=""
                  className={`h-full w-full object-cover absolute top-0 left-0 bottom-0 right-0 ${
                    isLoading[item.id] ? "hidden" : ""
                  }`}
                  onLoad={() => handleImageLoad(item.id)}
                />
                <div className="absolute bottom-2 left-2 bg-[#b3b3b3] text-white p-1 rounded-lg text-xs">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredImages} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-4 gap-3 w-full mt-6">
            {filteredImages?.map((item) => (
              <SortableItem item={item} key={item.id} />
            ))}
          </div>
        </SortableContext>
      </DndContext> */}

      {/* <div className="grid grid-cols-4 gap-3 w-full mt-6">
        {filteredImages?.map((item) => (
          <div
            key={item.id}
            className={`relative h-[289px]`}
          >
            {isLoading[item.id] ? <Skeleton className="w-full h-full" /> : null}
            <img
              src={item.path}
              alt=""
              className={`h-full w-full object-cover absolute top-0 left-0 bottom-0 right-0 ${
                isLoading[item.id] ? "hidden" : ""
              }`}
              onLoad={() => handleImageLoad(item.id)}
            />
            <div className="absolute bottom-2 left-2 bg-[#b3b3b3] text-white p-1 rounded-lg text-xs">
              {item.tag}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Images;
