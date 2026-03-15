import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchbarLayout({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const q = router.query.q as string;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    onSubmit();
  };

  const onSubmit = () => {
    if (!search || search === q) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요..."
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
