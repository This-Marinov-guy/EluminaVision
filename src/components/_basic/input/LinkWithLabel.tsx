import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { getLinkIcon } from "@/utils/helpers";

const LinkWithLabel = (props) => {
  const { link, setLinkData } = props;

  return (
    <div className="flex gap-2">
      <InputGroup>
        <Input placeholder="Label" value={link.label} onChange={(e) => setLinkData("label", e.target.value)} />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <i className={getLinkIcon(link.url, link.label)}></i>
        </InputLeftElement>
        <Input placeholder="Link" value={link.url} onChange={(e) => setLinkData("url", e.target.value)} />
      </InputGroup>
    </div>
  );
};

export default LinkWithLabel;
