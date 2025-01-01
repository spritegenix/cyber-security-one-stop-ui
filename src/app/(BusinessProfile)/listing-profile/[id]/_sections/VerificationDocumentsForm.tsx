import { useMutationBusinessFile } from "@/app/_queryCall/businessAuth/csr";
import { useEffect, useState } from "react";
import { DocumentUploaderForm } from "../../../../../components/elements/fileUploaders/DocumentUploaderForm";

export default function VerificationDocumentsForm({ data, refetchData }: any) {
  const [backendData, setBackendData] = useState<any>();
  useEffect(() => {
    setBackendData(data);
  }, [data]);

  const { handleUpdate, data: mutationResult, loading, error } = useMutationBusinessFile();

  useEffect(() => {
    console.log("Mutation result:", mutationResult);
    console.log("Error:", error);
  }, [mutationResult, error]);

  async function handleFileFunction(data: any) {
    let docs = data?.map((item: any) => ({
      type: item?.customName,
      documentId: item?.id,
      document: item?.file,
      toDelete: item?.toDelete,
    }));
    try {
      await handleUpdate({ documents: docs });
    } catch (e) {
      console.error("Error updating documents", e);
    }
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Verification Documents</h2>
      {backendData && backendData?.businessSupportingDocuments && (
        <DocumentUploaderForm
          defaultData={
            backendData?.businessSupportingDocuments?.map((item: any) => ({
              id: item?.id,
              customName: item?.type,
              file: item?.url,
              url: item?.url,
              order: "",
            })) || []
          }
          mutationHandler={handleFileFunction}
          error={error?.message}
          responseData={mutationResult?.manageBusinessSupportingDocuments?.map(
            (item: any) => item?.message,
          )}
          loading={loading}
          maxFiles={10}
          maxFileSize={10 * 1024 * 1024}
        />
      )}
    </div>
  );
}
