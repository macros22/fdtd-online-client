import { Header } from "components/layouts/header/Header";
import { MainLayout } from "components/layouts/main-layout/MainLayout";
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
    <MainLayout>
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
    </MainLayout>
  );
}
export default TheoryPage;

