export const openSidebar = () => {
  document.querySelector(".tmp_side_bar").classList.add("tmp_side_bar_open");
  document.body.classList.add("sidemenu-active");
};
export const closeSidebar = () => {
  document.querySelector(".tmp_side_bar").classList.remove("tmp_side_bar_open");
  document.body.classList.remove("sidemenu-active");
};
