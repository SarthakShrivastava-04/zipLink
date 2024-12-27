import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { UrlContext } from "@/context";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = useContext(UrlContext);

  const navigate = useNavigate();
  const ref = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  let longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues({
      title: "",
      longUrl: longLink ? longLink : "",
      customUrl: "",
    });
  }, [longLink]);

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .required("Long URL is required")
      .url("must be a valid URL"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    data,
    loading,
    error,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) navigate(`/link/${data[0].id}`);
  }, [data, error]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(open) => {
        if (!open) {
          setSearchParams({});
          longLink = "";
        }
      }}
    >
      <DialogTrigger>
        <Button variant='destructive'>Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl text-left">
            Create New
          </DialogTitle>
        </DialogHeader>

        {formValues.longUrl && (
          <QRCode value={formValues.longUrl} size={250} ref={ref} />
        )}

        <Input
          placeholder="Enter short link's title"
          id="title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          placeholder="Enter your long url"
          id="longUrl"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="p-2">zipLink.in</Card> /
          <Input
            placeholder="custom url (optional)"
            id="customUrl"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>
        {error && <Error message={error.message} />}

        <DialogFooter className="sm:justify-start">
          <Button disabled={loading} onClick={createNewLink} type="submit">
            {loading ? <BeatLoader size={10} /> : "create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
