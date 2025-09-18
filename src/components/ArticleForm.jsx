import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Form,
  FormField,
  TextArea,
  TextInput,
  Image,
  Text,
} from "grommet";
import { Trash } from "grommet-icons";
import { v4 as uuidv4 } from "uuid";
import useArticleStore from "../store/useArticleStore";
import { getAiImageUrl } from "../configs/config";

const ArticleForm = () => {
  const navigate = useNavigate();
  const addUserArticle = useArticleStore((state) => state.addUserArticle);

  const [title, setTitle] = useState("");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Trigger AI image generation on blur, so the whole title is written
  const handleTitleBlur = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== submittedTitle) {
      const url = getAiImageUrl(trimmed);
      setSubmittedTitle(trimmed);
      setImageUrl(url);
      setImageLoading(true);
    } else if (!trimmed) {
      setSubmittedTitle("");
      setImageUrl("");
      setImageLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const newErrors = {};
    if (!trimmedTitle) newErrors.title = "Title is required";
    if (!trimmedBody) newErrors.body = "Content is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newArticle = {
      id: uuidv4(),
      title: trimmedTitle,
      body: trimmedBody,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    addUserArticle(newArticle);
    navigate("/"); // Go back to home
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box direction="row" pad="medium" gap="large" justify="center" wrap>
      <Box width="large">
        <Box align="center" margin={{ bottom: "large", top: "small" }}>
          <Text
            color="dark-4"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "48px",
            }}
          >
            Write until your pen runs dry...
          </Text>
        </Box>

        <Form onSubmit={handleSubmit}>
          <FormField
            label="Article title: "
            error={errors.title}
            margin={{ bottom: "medium" }}
          >
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              placeholder="Please enter a title..."
            />
          </FormField>

          <FormField
            label="Article content: "
            error={errors.body}
            margin={{ top: "large" }}
          >
            <TextArea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your article..."
              fill
              resize={false}
              style={{
                marginBottom: body.length === 0 ? "-1em" : "0.2em", // Setting smaller margin when there is no input, to make similar design.
              }}
            />
          </FormField>

          <Box direction="row" gap="small" margin={{ top: "medium" }}>
            <Button type="submit" primary label="Save Article" />
            <Button label="Cancel" onClick={handleCancel} />
          </Box>
        </Form>
      </Box>

      {submittedTitle && (
        <Box
          width="medium"
          align="center"
          justify="center"
          gap="small"
          height="medium"
          style={{ position: "relative" }}
        >
          {imageUrl && (
            <>
              <Image
                fit="cover"
                src={imageUrl}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                }}
                style={{ borderRadius: 8 }}
              />

              {imageLoading && (
                <Box
                  fill
                  align="center"
                  justify="center"
                  background="light-2"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 8,
                  }}
                >
                  <Text size="small">Generating image…</Text>
                </Box>
              )}

              {!imageLoading && (
                <Button
                  icon={<Trash />} //Icon from Grommet icons
                  onClick={() => {
                    setImageUrl("");
                    setSubmittedTitle("");
                  }}
                  plain
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    zIndex: 1,
                  }}
                />
              )}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ArticleForm;
