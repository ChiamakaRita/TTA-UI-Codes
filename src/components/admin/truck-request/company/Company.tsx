import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../api/main/appStore";
import CustomDefaultTabHeading from "../../../shared/headings/CustomDefaultTabHeading";
import SimpleTable from "../../../shared/table/SimpleTable";
import CreateOrUpdateCompany from "./CreateOrUpdateCompany";

export default observer(function Company() {
  const { companyStore, commonStore } = useStore();

  useEffect(() => {
    if (companyStore.companies.length === 0) {
      (async function getData() {
        await companyStore.allCompanies();
      })();
    }
  }, [companyStore]);

  return (
    <>
      <CustomDefaultTabHeading content="Companies Management" />
      <div className="shadow-card p-3">
        <SimpleTable
          titles={["name", "state", "location", "product", ""]}
          data={companyStore.companies}
          tableBodyBuilder={(el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.originState}</td>
              <td>{el.origin}</td>
              <td>{el.productType}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateOrUpdateCompany companyData={el} />
                    )
                  }
                >
                  Edit
                </button>{" "}
                &nbsp;&nbsp;
                <button className="btn btn-danger btn-sm " disabled>
                  Remove
                </button>
              </td>
            </tr>
          )}
        />

        <Button
          content="Add New Company"
          type="submit"
          color="vk"
          icon="plus circle"
          className="official-form-btn"
          onClick={() =>
            commonStore.setModalContent(
              <CreateOrUpdateCompany companyData={null} />
            )
          }
        />
      </div>
    </>
  );
});
