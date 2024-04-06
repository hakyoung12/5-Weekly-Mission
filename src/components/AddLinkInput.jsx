import addImg from "../assets/link.svg";
import "./AddLinkInput.css";
import Btn from "./Btn";

function AddLinkInput() {
  return (
    <div className="AddLinkFormWrap">
      <form className="AddLinkForm">
        <div className="AddLinkForm__wrap">
          <img className="AddLinkForm__Img" src={addImg} alt="링크추가" />
          <input
            id="AddLinkForm__Input"
            type="text"
            placeholder="링크를 추가해 보세요."
          />
          <button className="AddLinkForm__addBtn">
            <Btn>추가하기</Btn>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLinkInput;