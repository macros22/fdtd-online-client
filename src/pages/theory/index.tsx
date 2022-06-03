import Header from "components/organisms/header/Header";
import { withLayout } from "layout/MainLayout";
import Link from "next/link";
import React from "react";

const postNames = [
  "one-dimension",
  "two-dimension",
  "interference",
  "difraction",
  "border",
];

function TheoryPage() {
  return (
    <>
      <Header />

      {postNames.map((postName) => {
        return (
          <li key={postName}>
            <Link href={`/theory/${postName}`}>
              <a

              // className={cn(styles.labContentType, {
              //   [styles.activeLabContentType]:
              //     currentContentType === ContentType.THEORY,
              // })}
              >
                {postName}
              </a>
            </Link>
          </li>
        );
      })}
    </>
  );
}
// export default TheoryPage;

export default withLayout(TheoryPage);
