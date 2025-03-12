import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import AdminLayout from '../../layout/layout'
import useCompanyStore from '../../../../store/useCompanyStore'
import { FormTemplate } from '../../interface/form-builder.interface'

import { useFormState } from './hooks/useFormState'
import { useFormFields } from './hooks/useFormFields'
import { useFormTemplates } from './hooks/useFormTemplates'

import FormHeader from './components/FormHeader'
import FormMetadata from './components/FormMetadata'
import FieldForm from './components/FieldForm'
import FieldList from './components/FieldList'
import FormActions from './components/FormActions'
import SavedFormsList from './components/SavedFormsList'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import FormPreview, { IdentificacaoTemplate } from './components/FormPreview'
import { identificacaoFormTemplate } from './services/identificacaoFormTemplate'
import { useEffect, useState } from 'react'
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'

export default function DynamicForm() {
  const paddingX = useBreakpointValue({ base: '1rem', md: '5rem' })
  const marginTop = useBreakpointValue({ base: '1rem', md: '2rem' })
  const { selectedCompanyId } = useCompanyStore()
  const storedCompanyId = localStorage.getItem('globalCompanyFilter')
  const companyId = parseInt(selectedCompanyId ?? storedCompanyId ?? '1')
  const [previewForm, setPreviewForm] = useState<FormTemplate | null>(null)

  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose
  } = useDisclosure()

  const handlePreviewForm = (form: FormTemplate) => {
    setPreviewForm(form)
    onPreviewOpen()
  }

  const {
    formName,
    setFormName,
    formDescription,
    setFormDescription,
    resetForm: resetFormMetadata,
    saveForm
  } = useFormState()

  const {
    formFields,
    currentField,
    setCurrentField,
    enumValues,
    setEnumValues,
    enumNames,
    setEnumNames,
    currentSchema,
    uiSchema,
    isLoading,
    addField,
    removeField,
    moveFieldUp,
    moveFieldDown,
    clearAllFields,
    resetCurrentField,
    loadFieldsFromSchema,
    loadedForm,
    isDirty,
    setIsDirty
  } = useFormFields(companyId)

  const {
    savedForms,
    loading,
    selectedForm,
    setSelectedForm,
    loadSavedForms,
    setAsDefault,
    deleteForm
  } = useFormTemplates(companyId)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (loadedForm && !selectedForm) {
      setSelectedForm(loadedForm)
      setFormName(loadedForm.name)
      setFormDescription(loadedForm.description ?? '')
    }
  }, [
    loadedForm,
    selectedForm,
    setFormName,
    setFormDescription,
    setSelectedForm
  ])

  const handleSaveForm = async () => {
    await saveForm(
      companyId,
      currentSchema,
      uiSchema,
      selectedForm || loadedForm,
      () => {
        loadSavedForms()
        setIsDirty(false)
        if (!selectedForm && !loadedForm) {
          handleResetForm()
        }
      }
    )
  }

  const handleResetForm = () => {
    resetFormMetadata()
    resetCurrentField()
    setSelectedForm(null)
    setIsDirty(false)

    if (loadedForm) {
      setFormName(loadedForm.name)
      setFormDescription(loadedForm.description ?? '')
      loadFieldsFromSchema(
        loadedForm.formData.schema,
        loadedForm.formData.uiSchema || {}
      )
    }
  }

  const handleEditForm = (form: FormTemplate) => {
    setSelectedForm(form)
    setFormName(form.name)
    setFormDescription(form.description ?? '')
    loadFieldsFromSchema(form.formData.schema, form.formData.uiSchema || {})
  }

  const handleDeleteForm = () => {
    onOpen()
  }

  const confirmDeleteForm = async () => {
    if (selectedForm?.id) {
      await deleteForm(selectedForm.id)
      onClose()
    }
  }

  const handleLoadTemplate = () => {
    setFormName('Formulário de Identificação')
    setFormDescription(
      'Formulário para coleta de informações pessoais e profissionais'
    )
    loadFieldsFromSchema(
      identificacaoFormTemplate.schema,
      identificacaoFormTemplate.uiSchema
    )
  }

  return (
    <AdminLayout>
      <Flex direction="column" align="center" mt={marginTop} px={paddingX}>
        <FormHeader title="Configuração do Formulário Dinâmico" />

        <Box w="100%" mb={6}>
          <FormActions
            isEditing={!!selectedForm || !!loadedForm}
            isDirty={isDirty}
            loading={loading}
            selectedForm={selectedForm || loadedForm}
            onSave={handleSaveForm}
            onReset={handleResetForm}
            onDelete={handleDeleteForm}
            onLoadTemplate={handleLoadTemplate}
          />

          <FormMetadata
            formName={formName}
            setFormName={setFormName}
            formDescription={formDescription}
            setFormDescription={setFormDescription}
          />

          <FieldForm
            currentField={currentField}
            setCurrentField={setCurrentField}
            enumValues={enumValues}
            setEnumValues={setEnumValues}
            enumNames={enumNames}
            setEnumNames={setEnumNames}
            addField={addField}
          />

          <FieldList
            formFields={formFields}
            removeField={removeField}
            moveFieldUp={moveFieldUp}
            moveFieldDown={moveFieldDown}
            clearAllFields={clearAllFields}
            isLoading={isLoading}
          />

          <Box mb={5}>
            <FormPreview
              schema={currentSchema}
              uiSchema={uiSchema}
              formName={formName}
            />
          </Box>

          <SavedFormsList
            forms={savedForms}
            loading={loading}
            onEdit={handleEditForm}
            onSetDefault={setAsDefault}
            onDelete={form => {
              setSelectedForm(form)
              onOpen()
            }}
            onPreview={handlePreviewForm}
          />
        </Box>

        <DeleteConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={confirmDeleteForm}
          formName={selectedForm?.name ?? ''}
          isLoading={loading}
        />

        <Modal isOpen={isPreviewOpen} onClose={onPreviewClose} size="5xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {previewForm?.name ?? 'Pré-visualização do Formulário'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {previewForm && (
                <Box w="full" maxW="2xl" mx="auto" mt={4} mb={4}>
                  <Heading as="h2" size="lg" mb="1rem" textAlign="center">
                    {previewForm?.name || 'Pré-visualização do Formulário'}
                  </Heading>
                  <Box
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="white"
                    w="full"
                  >
                    <Form
                      schema={previewForm.formData.schema}
                      uiSchema={previewForm.formData.uiSchema || {}}
                      validator={validator}
                      onSubmit={() => {}}
                      formData={{}}
                      templates={IdentificacaoTemplate}
                    >
                      <Button
                        type="submit"
                        bg={'#1F7CBF'}
                        color={'white'}
                        mt={'2rem'}
                        w={'full'}
                        display="none"
                      >
                        Enviar Formulário
                      </Button>
                    </Form>
                  </Box>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </AdminLayout>
  )
}
