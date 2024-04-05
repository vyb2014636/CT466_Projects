import React from "react";
import { Slide, BestSeller, Sidebar, FlashSales } from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";

const Home = () => {
  const { IoIosArrowForward } = icons;
  const { categories } = useSelector((state) => state.app);
  console.log(categories);
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-main mb-8 text-center  h-[43.7rem]">
        <Slide />
      </div>
      <div className="w-main mb-8 text-center ">
        <BestSeller />
      </div>
      <div className="w-main mb-8 text-center">
        <FlashSales />
      </div>
      <div className="w-main mb-8 text-center">
        <h3 className="text-[1.3rem] font-semibold py-[1rem] border-b-2 border-b-orange-500">
          Hot Collection
        </h3>
        <div className="flex flex-wrap mx-[-8px] mt-4">
          {categories
            ?.filter((el) => el.brand.length > 0)
            ?.map((el) => (
              <div key={el._id} className="w-1/3 p-2">
                <div className="border flex p-4 gap-4">
                  <img
                    src={el?.image}
                    alt=""
                    className="flex-1 object-cover w-[144px] h-[150px]"
                  ></img>
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-bold uppercase">{el.title}</h4>
                    <ul className="text-md">
                      {el?.brand?.map((item) => (
                        <span className="flex gap-1 items-center text-gray-500">
                          <IoIosArrowForward size={14} />
                          <li key={item}>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-main mb-8 text-center ">
        <h3 className="text-[1.3rem] font-semibold py-[1rem] border-b-2 border-b-orange-500">
          Blogs
        </h3>
      </div>
      <div className="w-main mb-8 text-center">
        <Sidebar />
      </div>
      <div className="w-full h-[500px] bg-black"></div>
    </div>
  );
};

export default Home;
