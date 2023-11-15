import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import Image from "next/image";

export default function SocialShare({ url, title, description, hastag }) {
  return (
    <div className="h-5 flex gap-3">
      <FacebookShareButton url={url} quote={title} hashtag={hastag}>
        <Image
          src={"/socials/facebook.svg"}
          width={16}
          height={16}
          alt="facebook"
        />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} hashtag={hastag}>
        <Image
          src={"/socials/twitter.svg"}
          width={16}
          height={16}
          alt="twitter"
        />
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        summary={description}
        hashtag={hastag}
      >
        <Image
          src={"/socials/linkedin.svg"}
          width={16}
          height={16}
          alt="linkedin"
        />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <Image
          src={"/socials/whatsapp.svg"}
          width={16}
          height={16}
          alt="whatsapp"
        />
      </WhatsappShareButton>
    </div>
  );
}
