import { useForm, Controller } from "react-hook-form";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { FaPlaystation, FaXbox, FaRegImage } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";

import "./AddItemForm.css";

function AddItemForm({ addItem, onCahngeInput, setIsAdding }) {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const [nameLabel, setNameLable] = useState();
  const [priceLabel, setPriceLabel] = useState();
  const [youtubeLabel, setYoutubeLabel] = useState();
  const [descriptionLabel, setDescriptionLable] = useState();
  const [uploadMessage, setUploadMessage] = useState(
    "Drag n' drop or click to upload image"
  );
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
    setValue,
    formState: { isDirty, isValid },
  } = useForm();
  const { ref, onChange, ...fields } = register("image", {
    required: true,
  });

  const onClickImage = () => {
    imageRef.current.click();
  };

  const onDragHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let file = e.dataTransfer.files[0];
      let fileType = file.name.split(".").pop();
      if (fileType !== "jpeg" && file !== "jpg" && fileType !== "png") {
        setUploadMessage(
          "Only .jpeg, .jpg or .png file types are allowed. Please upload a valid image."
        );
        return;
      }
      setValue("image", e.dataTransfer.files, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setUploadMessage(file.name);
      onCahngeInput({
        backgroundImage: `url(${URL.createObjectURL(file)})`,
      });
    }
  };

  const onSubmitHandler = (data) => {
    let platforms = data.platforms.map((item) => item.value);
    const { name, price, description, youtube } = data;
    const image = data.image[0];
    const addItemForm = new FormData();
    addItemForm.append("email", loggedInUser.userEmail);
    addItemForm.append("name", name);
    addItemForm.append("price", price);
    addItemForm.append("description", description);
    addItemForm.append("image", image);
    addItemForm.append("platforms", platforms);
    addItemForm.append("youtubeUrl", youtube);
    setIsAdding(true);
    addItem(addItemForm);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="add-item__form">
      <div className="add-item-message">New Game</div>
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
            onChange: () => {
              let change = getValues("name");
              onCahngeInput({ title: change });
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
          step={"0.01"}
          onFocus={() => {
            if (!getValues("price")) setPriceLabel("moveUp");
          }}
          {...register("price", {
            required: true,
            onBlur: () => {
              if (!getValues("price")) setPriceLabel("moveDown");
            },
            onChange: () => {
              let change = getValues("price");
              onCahngeInput({ price: change });
            },
          })}
        ></input>
      </div>
      <div className="input-label__box">
        <label htmlFor="description" className={descriptionLabel}>
          Description
        </label>
        <textarea
          type={"text"}
          onFocus={() => {
            if (!getValues("description")) setDescriptionLable("moveUp");
          }}
          {...register("description", {
            required: true,
            onBlur: () => {
              if (!getValues("description")) setDescriptionLable("moveDown");
            },
          })}
        ></textarea>
      </div>
      <div className="input-label__box">
        <label htmlFor="youtube" className={youtubeLabel}>
          Youtube Video Url
        </label>
        <input
          type={"text"}
          onFocus={() => {
            if (!getValues("youtube")) setYoutubeLabel("moveUp");
          }}
          {...register("youtube", {
            required: true,
            onBlur: () => {
              if (!getValues("youtube")) setYoutubeLabel("moveDown");
            },
          })}
        ></input>
      </div>
      <div
        onDragEnter={onDragHandler}
        onDragOver={onDragHandler}
        onDrop={onDropHandler}
        className="input-label__box-image"
        onClick={onClickImage}
        style={{
          border: `1px dashed ${
            getValues("image") && getValues("image").length > 0
              ? "#ffe2839d"
              : "#ff747499"
          }`,
          padding: "0.5rem",
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
          onChange={(e) => {
            setUploadMessage(e.currentTarget.files[0].name);
            onCahngeInput({
              backgroundImage: `url(${URL.createObjectURL(
                e.currentTarget.files[0]
              )})`,
            });
            onChange(e);
          }}
          {...fields}
          ref={(instance) => {
            ref(instance);
            imageRef.current = instance;
          }}
        />
        <p style={{ margin: "0", fontSize: "0.7rem" }}>{uploadMessage}</p>
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
                  onChange: (e) => {
                    // console.log();
                    onCahngeInput({
                      platforms: e.target.value.map((item) => item.value),
                    });
                  },
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
      <input type="submit" disabled={!(isValid && isDirty)} value="Add Item" />
    </form>
  );
}

export default AddItemForm;
