import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

interface AgentDetails {
  nameOfEstablishment: string;
  address: string;
  poBox: string;
  phone: string;
  fax: string;
  email: string;
  orn: string;
  dedLicense: string;
  nameOfRegisteredAgent: string;
  brn: string;
  dateIssued: string;
  mobile: string;
  agentEmail: string;
}

interface PropertyDetails {
  propertyAddress: string;
  masterDeveloper: string;
  masterProject: string;
  buildingName: string;
  listedPrice: string;
}

interface CommissionDetails {
  isBuyer: boolean;
  isSeller: boolean;
  isLandlord: boolean;
  isTenant: boolean;
  agentACommission: string;
  agentBCommission: string;
  clientsName: string;
  clientContactedListingAgent: 'yes' | 'no' | '';
}

interface PdfFormData {
  date: string;
  agentA: AgentDetails;
  agentB: AgentDetails;
  property: PropertyDetails;
  commission: CommissionDetails;
}

const PdfEditorPage: React.FC = () => {
  const [formData, setFormData] = useState<PdfFormData>({
    date: '',
    agentA: {
      nameOfEstablishment: '',
      address: '',
      poBox: '',
      phone: '',
      fax: '',
      email: '',
      orn: '',
      dedLicense: '',
      nameOfRegisteredAgent: '',
      brn: '',
      dateIssued: '',
      mobile: '',
      agentEmail: '',
    },
    agentB: {
      nameOfEstablishment: '',
      address: '',
      poBox: '',
      phone: '',
      fax: '',
      email: '',
      orn: '',
      dedLicense: '',
      nameOfRegisteredAgent: '',
      brn: '',
      dateIssued: '',
      mobile: '',
      agentEmail: '',
    },
    property: {
      propertyAddress: '',
      masterDeveloper: '',
      masterProject: '',
      buildingName: '',
      listedPrice: '',
    },
    commission: {
      isBuyer: false,
      isSeller: false,
      isLandlord: false,
      isTenant: false,
      agentACommission: '',
      agentBCommission: '',
      clientsName: '',
      clientContactedListingAgent: '',
    },
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const originalPdfUrl = '/Agent to Agentlatest[1].pdf'; // Assuming the PDF is in the public folder or root accessible

  const fillPdfForm = useCallback(async () => {
    try {
      const existingPdfBytes = await fetch(originalPdfUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // Helper function to safely set text field
      const setTextField = (fieldName: string, value: string) => {
        try {
          const field = form.getTextField(fieldName);
          field.setText(value);
        } catch (e) {
          console.warn(`Text field ${fieldName} not found:`, e);
        }
      };

      // Helper function to safely set checkbox
      const setCheckboxField = (fieldName: string, checked: boolean) => {
        try {
          const field = form.getCheckBox(fieldName);
          if (checked) {
            field.check();
          } else {
            field.uncheck();
          }
          console.log(`Checkbox '${fieldName}' action: ${checked ? 'check' : 'uncheck'}`);
        } catch (e) {
          console.warn(`Checkbox field ${fieldName} not found or not a checkbox:`, e);
        }
      };

      // Helper function to safely set Yes/No checkboxes
      const setYesNoCheckbox = (yesFieldName: string, noFieldName: string, value: 'yes' | 'no' | '') => {
        setCheckboxField(yesFieldName, value === 'yes');
        setCheckboxField(noFieldName, value === 'no');
      };

      // Fill Date
      setTextField('DATE', formData.date);

      // Fill Agent A details
      setTextField('Name of establishment- A', formData.agentA.nameOfEstablishment);
      setTextField('Address of Agent A', formData.agentA.address);
      setTextField('PO - Agent A', formData.agentA.poBox);
      setTextField('Phone - Agent A', formData.agentA.phone);
      setTextField('Fax - Agent A', formData.agentA.fax);
      setTextField('Email - Agent A', formData.agentA.email);
      setTextField('ORN - Agent A', formData.agentA.orn);
      setTextField('DED licence- Agent A', formData.agentA.dedLicense);
      setTextField('Name of Registered Agent A', formData.agentA.nameOfRegisteredAgent);
      setTextField('BRN of Agent A', formData.agentA.brn);
      setTextField('Date Issued- Agent A', formData.agentA.dateIssued);
      setTextField('Mobile - Agent A', formData.agentA.mobile);
      setTextField('Email _ Registered agent A', formData.agentA.agentEmail);

      // Fill Agent B details
      setTextField('Name of establishment - Agent B', formData.agentB.nameOfEstablishment);
      setTextField('ADDRESS - Agent B', formData.agentB.address);
      setTextField('PO - Agent B', formData.agentB.poBox);
      setTextField('Phone - agent B', formData.agentB.phone);
      setTextField('Fax - Agent B', formData.agentB.fax);
      setTextField('Email - Agent B', formData.agentB.email);
      setTextField('ORN - Agent B', formData.agentB.orn);
      setTextField('DED License - Agent B', formData.agentB.dedLicense);
      setTextField('Name of registered Agent B', formData.agentB.nameOfRegisteredAgent);
      setTextField('BRN - Agent B', formData.agentB.brn);
      setTextField('Date Issued - Agent B', formData.agentB.dateIssued);
      setTextField('Mobile - Agent B', formData.agentB.mobile);
      setTextField('Email- Registered Agent B', formData.agentB.agentEmail);

      // Fill Property details
      setTextField('Property address', formData.property.propertyAddress);
      setTextField('Master Developer', formData.property.masterDeveloper);
      setTextField('Master Project', formData.property.masterProject);
      setTextField('Building name', formData.property.buildingName);
      setTextField('Listed Price', formData.property.listedPrice);

      // Fill Commission details
      setCheckboxField('Buyer Check Box', formData.commission.isBuyer);
      setCheckboxField('Seller Check box', formData.commission.isSeller);
      setCheckboxField('Landlord check box', formData.commission.isLandlord);
      setCheckboxField('Tenant check box', formData.commission.isTenant);
      setTextField('Agent A', formData.commission.agentACommission);
      setTextField('Agent B', formData.commission.agentBCommission);
      setTextField('Clientss Name', formData.commission.clientsName);
      setYesNoCheckbox('Yes check box', 'No check box', formData.commission.clientContactedListingAgent);
      
      // Signature fields
      setTextField('Party A', '');
      setTextField('Party B', '');

      // Company Footer Section
      setTextField('Company email', '');
      setTextField('Company website', '');
      setTextField('company location', '');

      const modifiedPdfBytes = await pdfDoc.save();
      setPdfBytes(modifiedPdfBytes);
    } catch (err) {
      console.error('Error filling PDF:', err);
      setError('Failed to load or fill PDF. Please ensure the PDF file exists and is a fillable form and field names are correct.');
    }
  }, [formData, originalPdfUrl]);

  useEffect(() => {
    fillPdfForm();
  }, [fillPdfForm]);

  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgentInputChange = (agentType: 'agentA' | 'agentB', e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [agentType]: {
        ...prev[agentType],
        [name]: value,
      },
    }));
  };

  const handlePropertyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        [name]: value,
      },
    }));
  };

  const handleCommissionCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      commission: {
        ...prev.commission,
        [name]: checked,
      },
    }));
  };

  const handleCommissionRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      commission: {
        ...prev.commission,
        [name]: value as 'yes' | 'no',
      },
    }));
  };

  const handleCommissionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      commission: {
        ...prev.commission,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};

    if (!formData.date) errors.date = "Date is required";

    // Agent A Validation
    if (!formData.agentA.nameOfEstablishment) errors.agentA_nameOfEstablishment = "Name of Establishment (Agent A) is required";
    if (!formData.agentA.address) errors.agentA_address = "Address (Agent A) is required";
    if (!formData.agentA.phone) errors.agentA_phone = "Phone (Agent A) is required";
    if (!formData.agentA.email) errors.agentA_email = "Email (Agent A) is required";
    if (!formData.agentA.nameOfRegisteredAgent) errors.agentA_nameOfRegisteredAgent = "Name of Registered Agent (Agent A) is required";

    // Agent B Validation
    if (!formData.agentB.nameOfEstablishment) errors.agentB_nameOfEstablishment = "Name of Establishment (Agent B) is required";
    if (!formData.agentB.address) errors.agentB_address = "Address (Agent B) is required";
    if (!formData.agentB.phone) errors.agentB_phone = "Phone (Agent B) is required";
    if (!formData.agentB.email) errors.agentB_email = "Email (Agent B) is required";
    if (!formData.agentB.nameOfRegisteredAgent) errors.agentB_nameOfRegisteredAgent = "Name of Registered Agent (Agent B) is required";

    // Property Validation
    if (!formData.property.propertyAddress) errors.property_propertyAddress = "Property Address is required";
    if (!formData.property.listedPrice) errors.property_listedPrice = "Listed Price is required";

    // Commission Validation (example - adjust as needed)
    if (!formData.commission.clientsName) errors.commission_clientsName = "Client's Name is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      if (pdfBytes) {
        // Create a new Uint8Array from the existing one to ensure compatibility with Blob
        const finalPdfBytes = new Uint8Array(pdfBytes);
        const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filled_agent_agreement.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setSuccess('PDF generated and downloaded successfully!');
      } else {
        setError('PDF not generated yet. Please fill the form.');
      }
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
    }
  };

  const renderAgentSection = (agentType: 'agentA' | 'agentB') => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{`AGENT ${agentType === 'agentA' ? 'A' : 'B'}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name of Establishment"
          name="nameOfEstablishment"
          value={formData[agentType].nameOfEstablishment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
          error={!!validationErrors[`${agentType}_nameOfEstablishment`]}
          helperText={validationErrors[`${agentType}_nameOfEstablishment`]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData[agentType].address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
          error={!!validationErrors[`${agentType}_address`]}
          helperText={validationErrors[`${agentType}_address`]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="P.O. Box"
          name="poBox"
          value={formData[agentType].poBox}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData[agentType].phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
          error={!!validationErrors[`${agentType}_phone`]}
          helperText={validationErrors[`${agentType}_phone`]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fax"
          name="fax"
          value={formData[agentType].fax}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email (Establishment)"
          name="email"
          value={formData[agentType].email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
          error={!!validationErrors[`${agentType}_email`]}
          helperText={validationErrors[`${agentType}_email`]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="ORN"
          name="orn"
          value={formData[agentType].orn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="DED License"
          name="dedLicense"
          value={formData[agentType].dedLicense}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>Name of Registered Agent:</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name of Registered Agent"
          name="nameOfRegisteredAgent"
          value={formData[agentType].nameOfRegisteredAgent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
          error={!!validationErrors[`${agentType}_nameOfRegisteredAgent`]}
          helperText={validationErrors[`${agentType}_nameOfRegisteredAgent`]}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="BRN"
          name="brn"
          value={formData[agentType].brn}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date Issued"
          name="dateIssued"
          value={formData[agentType].dateIssued}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Mobile"
          name="mobile"
          value={formData[agentType].mobile}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email (Agent)"
          name="agentEmail"
          value={formData[agentType].agentEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAgentInputChange(agentType, e)}
        />
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agent to Agent Agreement (Form I) Editor
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          As per Real Estate Brokers by-Law No. (85) of 2006
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StyledPaper>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TextField
                      label="Date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleGeneralInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={!!validationErrors.date}
                      helperText={validationErrors.date}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                      THE PARTIES
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        {renderAgentSection('agentA')}
                      </Grid>
                      <Grid item xs={12}>
                        {renderAgentSection('agentB')}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                          DECLARATION BY AGENT "A"
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                          I hereby declare, I have read and understood the Real Estate Brokers Code
                          of Ethics, I have a current signed Seller's Agreement Form A, I shall respond
                          to a reasonable offer to purchase the listed property from Agent B, and shall
                          not contact Agent B's Buyer nor confer with their client under no
                          circumstances unless the nominated. Buyer herein has already discussed
                          the stated listed property with our Office
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                          DECLARATION BY AGENT "B"
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                          I hereby declare, I have read and understood the Real Estate Broker's Code of
                          Ethics, I have a current signed Buyer's Agreement Form B, I shall encourage my
                          Buyer as named herein, to submit a reasonable offer for the stated property and
                          not contact Agent A's Seller nor confer with their client under no circumstances
                          unless the Agent A has delayed our proposal on the prescribed Form with a
                          reasonable reply within 24 hours.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                      THE PROPERTY
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Property Address"
                          name="propertyAddress"
                          value={formData.property.propertyAddress}
                          onChange={handlePropertyInputChange}
                          error={!!validationErrors.property_propertyAddress}
                          helperText={validationErrors.property_propertyAddress}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Master Developer"
                          name="masterDeveloper"
                          value={formData.property.masterDeveloper}
                          onChange={handlePropertyInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Master Project"
                          name="masterProject"
                          value={formData.property.masterProject}
                          onChange={handlePropertyInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Building Name"
                          name="buildingName"
                          value={formData.property.buildingName}
                          onChange={handlePropertyInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Listed Price"
                          name="listedPrice"
                          value={formData.property.listedPrice}
                          onChange={handlePropertyInputChange}
                          error={!!validationErrors.property_listedPrice}
                          helperText={validationErrors.property_listedPrice}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                      THE COMMISSION (split)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      The following commission split is agreed between the 2 agents.
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.commission.isBuyer}
                          onChange={handleCommissionCheckboxChange}
                          name="isBuyer"
                        />
                      }
                      label="Buyer"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.commission.isSeller}
                          onChange={handleCommissionCheckboxChange}
                          name="isSeller"
                        />
                      }
                      label="Seller"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.commission.isLandlord}
                          onChange={handleCommissionCheckboxChange}
                          name="isLandlord"
                        />
                      }
                      label="Landlord"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.commission.isTenant}
                          onChange={handleCommissionCheckboxChange}
                          name="isTenant"
                        />
                      }
                      label="Tenant"
                    />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Agent A"
                          name="agentACommission"
                          value={formData.commission.agentACommission}
                          onChange={handleCommissionInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Agent B"
                          name="agentBCommission"
                          value={formData.commission.agentBCommission}
                          onChange={handleCommissionInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Client's Name"
                          name="clientsName"
                          value={formData.commission.clientsName}
                          onChange={handleCommissionInputChange}
                          error={!!validationErrors.commission_clientsName}
                          helperText={validationErrors.commission_clientsName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Has the client contacted the listing agent?
                        </Typography>
                        <RadioGroup
                          row
                          name="clientContactedListingAgent"
                          value={formData.commission.clientContactedListingAgent}
                          onChange={handleCommissionRadioChange}
                        >
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                      SIGNATURES
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
                      Both parties are required to co-operate fully, complete this FORM and BOTH retain a fully signed & stamped copy on file.
                      RERA DRS is available for both Parties.
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Party A"
                          name="partyA"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Party B"
                          name="partyB"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setFormData({
                            date: '',
                            agentA: {
                              nameOfEstablishment: '',
                              address: '',
                              poBox: '',
                              phone: '',
                              fax: '',
                              email: '',
                              orn: '',
                              dedLicense: '',
                              nameOfRegisteredAgent: '',
                              brn: '',
                              dateIssued: '',
                              mobile: '',
                              agentEmail: '',
                            },
                            agentB: {
                              nameOfEstablishment: '',
                              address: '',
                              poBox: '',
                              phone: '',
                              fax: '',
                              email: '',
                              orn: '',
                              dedLicense: '',
                              nameOfRegisteredAgent: '',
                              brn: '',
                              dateIssued: '',
                              mobile: '',
                              agentEmail: '',
                            },
                            property: {
                              propertyAddress: '',
                              masterDeveloper: '',
                              masterProject: '',
                              buildingName: '',
                              listedPrice: '',
                            },
                            commission: {
                              isBuyer: false,
                              isSeller: false,
                              isLandlord: false,
                              isTenant: false,
                              agentACommission: '',
                              agentBCommission: '',
                              clientsName: '',
                              clientContactedListingAgent: '',
                            },
                          });
                          setValidationErrors({}); // Clear validation errors on clear
                        }}
                      >
                        Clear
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Generate PDF
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PdfEditorPage; 