import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { FaPlaystation, FaXbox, FaRegImage } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";

import "./AddItemPage.css";
import Card from "../UI/UI_Utill/Card";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/UI_Utill/Loading";

function AddItemPage() {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const [nameLabel, setNameLable] = useState();
  const [priceLabel, setPriceLabel] = useState();
  const [descriptionLabel, setDescriptionLable] = useState();
  const animatedComponents = makeAnimated();
  const imageRef = useRef();
  const options = [
    { value: "PS", label: <FaPlaystation name="PS" /> },
    { value: "XBOX", label: <FaXbox name="XBOX" /> },
    { value: "PC", label: <GrPersonalComputer name="PC" /> },
  ];
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { isDirty, isValid },
  } = useForm();
  const { ref, ...fields } = register("image", { required: true });

  const {
    error,
    isLoading,
    sendRequest: addItem,
  } = useHttp(
    {
      url: "http://localhost:8080/admin/add-item/",
    },
    false,
    false
  );
  const onClickImage = () => {
    console.log(imageRef.current.click());
  };
  const onSubmitHandler = (data) => {
    let platforms = data.platforms.map((item) => item.value);
    const { name, price, description, image } = data;
    const formData = new FormData();
    // formData.append("name", name, undefined);
    // formData.append("email", loggedInUser.email, undefined);
    // formData.append("description", description, undefined);
    // formData.append("price", price, undefined);
    // formData.append("platforms", platforms, undefined);
    formData.append("image", image[0], image.name);
    // formData.append("image", image.)
    // form;
    // console.log(platforms);
    // console.log(image);
    addItem({
      name,
      price,
      description,
      image: formData,
      platforms,
      email: loggedInUser.email,
    });
    // addItem();
  };
  return (
    <main className="add-item-page__container">
      <h2>Add New Game To Store</h2>
      {isLoading && <Loading width={"100%"} height={"100%"} />}
      {!isLoading && (
        <Card width={"70%"}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="add-item__form"
          >
            <div className="add-item-message">{error ? error : "New Game"}</div>
            <div className="input-label__box">
              <label htmlFor="name" className={nameLabel}>
                Name
              </label>
              <input
                onFocus={() => {
                  if (!getValues("name")) setNameLable("moveUp");
                }}
                {...register("name", {
                  required: true,
                  minLength: 1,
                  onBlur: () => {
                    if (!getValues("name")) setNameLable("moveDown");
                  },
                })}
              ></input>
            </div>
            <div className="input-label__box">
              <label htmlFor="price" className={priceLabel}>
                Price
              </label>
              <input
                type={"number"}
                onFocus={() => {
                  if (!getValues("price")) setPriceLabel("moveUp");
                }}
                {...register("price", {
                  required: true,
                  onBlur: () => {
                    if (!getValues("price")) setPriceLabel("moveDown");
                  },
                })}
              ></input>
            </div>
            <div className="input-label__box">
              <label htmlFor="description" className={descriptionLabel}>
                Description
              </label>
              <input
                type={"text"}
                onFocus={() => {
                  if (!getValues("description")) setDescriptionLable("moveUp");
                }}
                {...register("description", {
                  required: true,
                  onBlur: () => {
                    if (!getValues("description"))
                      setDescriptionLable("moveDown");
                  },
                })}
              ></input>
            </div>
            <div
              className="input-label__box-image"
              onClick={onClickImage}
              style={{
                color:
                  getValues("image") && getValues("image").length > 0
                    ? "#ffe283"
                    : "#ff7474",
              }}
            >
              <input
                type="file"
                hidden
                accept=".jpeg, .png, .jpg"
                {...fields}
                ref={(instance) => {
                  ref(instance);
                  imageRef.current = instance;
                }}
              />
              {/* <p>
                {getValues("image") && getValues("image").length > 0
                  ? getValues("image")[0].name
                  : "Upload Image"}
              </p> */}
              <FaRegImage
                className="image-upload__btn"
                style={{ width: "2rem", height: "2rem" }}
              />
            </div>
            <div className="input-label__box">
              <Controller
                required={true}
                control={control}
                defaultValue=""
                name="platforms"
                render={({ field }) => {
                  return (
                    <Select
                      {...register("platforms", {
                        required: true,
                      })}
                      components={animatedComponents}
                      options={options}
                      isMulti={true}
                      placeholder="Platforms"
                      required={true}
                      ref={field.ref}
                      name={field.name}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
            <input
              type="submit"
              disabled={!(isValid && isDirty)}
              value="Add Item"
            />
          </form>
        </Card>
      )}
    </main>
  );
}

export default AddItemPage;
