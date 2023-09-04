import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Content, TemplateType } from "../lib/enums";
import { addContent } from "../data/contentSlicer";
import Alert from "./alert";

const SimpleEditor = () => {
  const dispatch = useDispatch();
  const [template, setTemplate] = useState<TemplateType>(TemplateType.Template_1);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [visiblity, setVisiblity] = useState<boolean[]>([false, false, false]); // [title, text, image]

  const initFormForTemplate = (newTemplate: TemplateType) => {
    let newVisibility: boolean[] = [false, false, false];
    console.log("New template: ", template);
    switch(newTemplate) { 
      case TemplateType.Template_1: { // Title + Text Block
        newVisibility[0] = true;
        newVisibility[1] = true;
        newVisibility[2] = false;
        break; 
      } 
      case TemplateType.Template_2: { // Text Block
        newVisibility[0] = false;
        newVisibility[1] = true;
        newVisibility[2] = false;
        break; 
      } 
      case TemplateType.Template_3: { // Image
        newVisibility[0] = false;
        newVisibility[1] = false;
        newVisibility[2] = true;
        break;    
      } 
      case TemplateType.Template_4: { // Title + Text Block + Image
        newVisibility[0] = true;
        newVisibility[1] = true;
        newVisibility[2] = true;
        break;
      }  
      default: { 
         console.log("Invalid choice"); 
         break;              
      } 
   }
   setVisiblity(newVisibility);
  }

  useEffect(() => {
    initFormForTemplate(template);
  }, [])

  const checkInputs = (): boolean => {
    let checkPass = true;
    switch (template) {
      case TemplateType.Template_1:
        if (title === "" || text === "") {
          alert("Title and text cannot be empty");
          checkPass = false;
        }
        break;
      case TemplateType.Template_2:
        if (text === "") {
          alert("Text cannot be empty");
          checkPass = false;
        }
        break;
      case TemplateType.Template_3:
        if (image === "") {
          alert("Image cannot be empty");
          checkPass = false;
        }
        break;
      case TemplateType.Template_4:
        if (title === "" || text === "") {
          alert("Title, text and imagee cannot be empty");
          checkPass = false;
        }
        break;
      default: { 
        console.log("Invalid choice"); 
        break;            
      } 
    }

    return checkPass;
  }

  return (
    <>
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Simple Editor
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose one of template, enter the text and upload imnage if you
            want, then preview and save your content
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="template"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Template
              </label>
              <div className="mt-2">
                <select
                  id="template"
                  name="template"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(event) => {
                    const newTemplate = parseInt(event.target.value);
                    setTemplate(newTemplate);
                    initFormForTemplate(newTemplate);
                  }}
                  value={template}
                >
                  <option value="0">Template 1</option>
                  <option value="1">Template 2</option>
                  <option value="2">Template 3</option>
                  <option value="3">Template 4</option>
                </select>
              </div>
            </div>

            {
              visiblity[0] && <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="off"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900
                    placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Input title here"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);

                    }}
                  />
                </div>
              </div>
              </div>
            }
            
            {
              visiblity[1] && <div className="col-span-full">
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Text
              </label>
              <div className="mt-2">
                <textarea
                  id="text"
                  name="text"
                  rows={10}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Text goese here ..."
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                />
              </div>
              </div>
            }
            
            {
              visiblity[2] && <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600
                      focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a image file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(event) => {
                          console.log(
                            "New uploaded image file",
                            event.target.value
                          );
                          setImage(event.target.value);
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG</p>
                </div>
              </div>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm
          hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600"
          onClick={() => {
            console.log("Trying to save content ...");
            if (!checkInputs()) {
              return;
            }
            
            const newContent: Content = {
              id: "0",
              template_type: template,
              text: text,
              title: title,
              image_url: "https://firebasestorage.googleapis.com/v0/b/kellner-a0864.appspot.com/o/images%2Fkellner-test-restaurants-2.png?alt=media&token=36873756-2d2d-4f16-8133-233980503556"
            }
            dispatch(addContent(newContent));
          }}
        >
          Preview
        </button>
      </div>
    </form>
    
    </>
    

  );
};

export default SimpleEditor;
