import { animation } from "../../Hooks/Animation/Animation";

type Items = { 
  button: HTMLDivElement | null, 
  nav: HTMLElement | null,
  content: HTMLDivElement | null,
};

const remToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const hideAnimation = animation<Items>((tl, { button, nav, content }) => {
  tl
    .to(button, { scale: 0.5, opacity: 0.25, duration: 0.25})
    .to(content, { opacity: 0, duration: 0.125})
    .to(nav, { width: 51, duration: 0.125}, "<")
    .to(nav, { height: 51, duration: 0.125})
    .to(button, { scale: 1, opacity: 1, duration: 0.25})
    .to(nav, { opacity: 0, scale: 0, duration: 0.25}, "<")
    .set(nav, { display: "none" })
});


export const showAnimation = (items: number) => animation<Items>((tl, { button, nav, content }) => {
  const height = (items + 2) * remToPixels(2.25);
  
  tl
    .set(nav, { height: 51, width: 51, scale: 0, opacity: 0, rotate: "-90deg", transformOrigin: "25px 25px", display: "block" })
    .to(button, { scale: 0.5, opacity: 0.25, duration: 0.25})
    .to(nav, { opacity: 1, scale: 1, duration: 0.25})
    .to(button, { scale: 1, opacity: 1, duration: 0.25}, "<")
    .to(nav, { height: height, duration: 0.125})
    .to(nav, { rotate: "0deg", duration: 0.25})
    .to(nav, { width: "10rem", duration: 0.125})
    .to(content, { opacity: 1, duration: 0.125}, "<")
});

