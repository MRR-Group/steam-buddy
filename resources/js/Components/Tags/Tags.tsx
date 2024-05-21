import { useContext } from "react";
import { TagButton } from "./TagButton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import "./Tags.css";

export type TagData = {
  name: string;
  games: number;
};

type Props = {
  selected: string[];
  tags: TagData[];
  onSelect?: (tag: string) => void;
  onUnselect?: (tag: string) => void;
}

export const Tags = ({ tags, selected, onSelect, onUnselect}: Props) => {
  const handleClick = (tag: string) => () => {
    const selected = isTagSelected(tag);

    if (!selected && onSelect) {
      onSelect(tag);
    }

    if (selected && onUnselect) {
      onUnselect(tag);
    }
  }

  const isTagSelected = (tag: string) => selected.includes(tag);

  return (
    <div className="w-full h-12 flex flex-col justify-center hide-scrollbar scroll-h-12">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {tags.map(tag => (
            <div key={tag.name} title={`${tag.games} games`}>
              <TagButton onClick={handleClick(tag.name)} active={isTagSelected(tag.name)}>
                {tag.name}
              </TagButton>
            </div>
          ))}
        </ScrollMenu>
    </div>
  )
}

const LeftArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible('first', true);
  
  if (isFirstItemVisible) {
    return <></>
  }

  return (
    <div className="h-full w-full flex justify-center items-center cursor-pointer hover:scale-75 transition-transform active:scale-50">
      <FaAngleLeft
        color="white"
        size="2rem"
        onClick={() => visibility.scrollPrev()}
        className="left"
      >Left</FaAngleLeft>
    </div>
  );
};

const RightArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible('last', true);

  if (isLastItemVisible) {
    return <></>
  }

  return (
    <div className="h-full w-full flex justify-center items-center cursor-pointer hover:scale-75 transition-transform active:scale-50">
      <FaAngleRight
        color="white"
        size="2rem"
        onClick={() => visibility.scrollNext()}
        className="left"
      >Right</FaAngleRight>
    </div>
  );
};