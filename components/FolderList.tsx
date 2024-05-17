import styles from "./FolderList.module.css";
import addBtn from "@/public/add.svg";
import addBtnMobile from "@/public/add 2.svg";
import shareBtn from "@/public/share.svg";
import renameBtn from "@/public/pen.svg";
import deleteBtn from "@/public/Group 36.svg";
import DeleteFolder from "../modals/DeleteFolder";
import EditAndAddFolder from "../modals/EditAndAddFolder";
import ShareFolder from "../modals/ShareFolder";
import { useState } from "react";
import CardListSection from "./CardListSection";
import FolderMenu from "./FolderMenu";
import SearchInput from "./SearchInput";
import Image from "next/image";

interface Folder {
  created_at: string;
  favorite: boolean;
  id: number;
  link: {
    count: number;
  };
  name: string;
  user_id: number;
}

interface FolderListProp {
  folders: Folder[];
}
const FolderList: React.FC<FolderListProp> = ({ folders }) => {
  const [modalOpen, setModalOpen] = useState<string>("");
  const [title, setTitle] = useState<string>("전체");
  const [id, setId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleTitle(folderName: string, folderId: number | null) {
    setTitle(folderName);
    setId(folderId);
  }

  const url =
    id === null
      ? "https://bootcamp-api.codeit.kr/api/users/1/links"
      : `https://bootcamp-api.codeit.kr/api/users/1/links?folderId=${id}`;

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  return (
    <section className={styles.folderLayout}>
      <SearchInput onSearch={handleSearch} />
      <div className={styles.folderLinkList}>
        <FolderMenu title={title} folders={folders} handleTitle={handleTitle} />
        <button
          className={styles.folderLinkList__addFolderButton}
          onClick={(e) => {
            e.preventDefault();
            setModalOpen("addFolder");
          }}
        >
          폴더 추가
          <div className={styles.folderLinkList__addFolderIcon}>
            <Image fill src={addBtn} alt="폴더추가" />
          </div>
        </button>
        <button
          className={styles.folderLinkList__addFolderButton__mobile}
          onClick={(e) => {
            e.preventDefault();
            setModalOpen("addFolder");
          }}
        >
          폴더 추가
          <div className={styles.folderLinkList__addFolderIcon}>
            <Image fill src={addBtnMobile} alt="폴더추가" />
          </div>
        </button>
        {modalOpen === "addFolder" && (
          <EditAndAddFolder
            madalTitle={"폴더 추가"}
            onClose={setModalOpen}
            alter={"추가하기"}
          />
        )}
      </div>

      <div>
        {title === "전체" ? (
          <>
            <div className={styles.folderLinkList__folderMenu}>
              <div
                className={styles.folderLinkList__folderName}
                id={id?.toString()}
              >
                {title}
              </div>
            </div>
            <CardListSection
              folders={folders}
              url={url}
              searchTerm={searchTerm}
            />
          </>
        ) : (
          <>
            <div className={styles.folderLinkList__folderMenu}>
              <div
                className={styles.folderLinkList__folderName}
                id={id?.toString()}
              >
                {title}
              </div>
              <div className={styles.folderLinkList__folderEditBtns}>
                <button
                  className={styles.folderLinkList__folderEditBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen("shareLink");
                  }}
                >
                  <div className={styles.folderLinkList__folderEditIcon}>
                    <Image fill src={shareBtn} alt="공유하기" />
                  </div>
                  공유
                </button>
                <button
                  className={styles.folderLinkList__folderEditBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen("alterName");
                  }}
                >
                  <div className={styles.folderLinkList__folderEditIcon}>
                    <Image fill src={renameBtn} alt="이름변경" />
                  </div>
                  이름 변경
                </button>

                <button
                  className={styles.folderLinkList__folderEditBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpen("delete");
                  }}
                >
                  <div className={styles.folderLinkList__folderEditIcon}>
                    <Image fill src={deleteBtn} alt="삭제" />
                  </div>
                  삭제
                </button>
              </div>
            </div>
            <CardListSection
              folders={folders}
              url={url}
              searchTerm={searchTerm}
            />
          </>
        )}
      </div>

      {modalOpen === "shareLink" && id && (
        <ShareFolder title={title} id={id} onClose={setModalOpen} />
      )}
      {modalOpen === "alterName" && (
        <EditAndAddFolder
          madalTitle={"폴더 추가"}
          onClose={setModalOpen}
          alter={"추가하기"}
        />
      )}
      {modalOpen === "delete" && (
        <DeleteFolder
          madalTitle={"폴더 삭제"}
          title={title}
          onClose={setModalOpen}
        />
      )}
    </section>
  );
};

export default FolderList;
