import useSWR from "swr";
import React from "react";
import { X } from "lucide-react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@heroui/react";

import { ApiClient } from "@utils/api";
import { Button, Input } from "@components/ui";

interface Props {
   pending: boolean
   isOpen: boolean;
   collaboratorId?: string
   type: 'baffa' | 'collab'
   onSave: () => void
   onOpenChange: () => void
   onChangeType: (type: 'baffa' | 'collab') => void
   onSelectCollaborator: (id: string) => void
}

const fetcher = (url: string) => ApiClient.get<Pagination<Collaborator>>(url).then(res => res.data.items);

export default function SaveProductModal({ isOpen, collaboratorId, type, pending, onSave, onOpenChange, onChangeType, onSelectCollaborator }: Props) {
   const { data: collaborators = [] } = useSWR<Collaborator[]>('/collaborators', fetcher);
   
   return (
      <Modal
         placement="center"
         hideCloseButton
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         size="full"
         classNames={{
            base: "w-[30rem] h-auto rounded-xl shadow-lg bg-white my-5",
         }}
      >
         <ModalContent>
            {(onClose) => (
               <>
                  <ModalHeader className="flex justify-between items-center px-4 py-3">
                     <h3 className="text-lg font-semibold">Save Product</h3>

                     <Button
                        className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                        onClick={onClose}
                     >
                        <X className="icon-button bg-none" />
                     </Button>
                  </ModalHeader>

                  <ModalBody className="flex flex-col justify-center items-center gap-6 focus:outline-none">
                     {/* Radio buttons */}
                     <div className="flex justify-start items-center gap-6 w-full">
                        <label className="flex items-center gap-2 cursor-pointer">
                           <input
                              type="radio"
                              name="postType"
                              value="baffa"
                              checked={type === 'baffa'}
                              onChange={() => onChangeType('baffa')}
                              className="accent-black w-6.5 h-6.5 cursor-pointer"
                           />

                           <span className="text-sm font-medium text-gray-800">BaffaBaffa Collection</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                           <input
                              type="radio"
                              name="postType"
                              value="collab"
                              checked={type === 'collab'}
                              onChange={() => onChangeType('collab')}
                              className="accent-black w-6.5 h-6.5 cursor-pointer"
                           />
                           <span className="text-sm font-medium text-gray-800">Collaborated Post</span>
                        </label>
                     </div>

                     {/* Select input */}
                     <Input
                        disabled={type === 'baffa'}
                        label="Collaborator"
                        name="collaborator"
                        type="select"
                        options={collaborators.map((c) => ({ key: c.id, label: c.name }))}
                        value={collaboratorId}
                        onChange={onSelectCollaborator}
                     />
                  </ModalBody>


                  <ModalFooter className="border-t border-brand-dark flex justify-between items-center mt-10 gap-5">
                     <Button
                        onClick={onClose}
                        rounded="sm"
                        variant="bordered"
                        className="py-2.5 px-12.5 flex-1"
                     >
                        Cancel
                     </Button>

                     <Button
                        onClick={onSave}
                        rounded="sm"
                        className="py-2.5 px-12.5 flex-1"
                     >
                        {pending ? 'Saving...' : 'Save'}
                     </Button>

                  </ModalFooter>
               </>
            )}
         </ModalContent>
      </Modal>
   )
}
