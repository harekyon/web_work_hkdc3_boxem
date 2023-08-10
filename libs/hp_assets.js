export function errorPop() {
  const errorPop = document.getElementById("jsErrorPop");
  console.log(errorPop);
  errorPop.insertAdjacentHTML(
    "beforeend",
    `
        <p>ERROR: 記事は見つかりませんでした</p>
    `
  );
  errorPop.classList.add("errorPopAnim");
  setTimeout(() => {
    errorPop.classList.remove("errorPopAnim");
    errorPop.removeChild(errorPop.lastChild);
  }, 4000);
  console.log("runrunruuuuu");
}
