import { Box, Button, Checkbox, VStack } from '@chakra-ui/react';
import { useFormVisibilityStore } from '../../../../store/store';
import { useEffect } from 'react';
import { fetchVisibilitySettings, updateVisibilitySettings } from '../../../../api/api';

const AdminPanel: React.FC = () => {
  const { visibility, toggleVisibility, setVisibility } = useFormVisibilityStore();

  const fields = [
    'nomeCompleto', 'dataNascimento', 'email', 'cpf',
    'tempoEmpresa', 'areaTrabalho', 'filialId',
    'funcao', 'genero', 'cidade', 'estado', 'pais',
    'processoEducacao', 'escolaridade', 'estadoCivil', 'filhos',
    'quantidadeLivros', 'hobbie', 'tempoCasaTrab', 'modeloTrabalho', 'partGrupos',
  ];

  useEffect(() => {
    const loadVisibilitySettings = async () => {
      const data = await fetchVisibilitySettings();
      data.forEach((item: { field: string; isVisible: boolean }) => {
        setVisibility(item.field, item.isVisible);
      });
    };

    loadVisibilitySettings();
  }, [setVisibility]);

  const handleSave = async () => {
    const updates = Object.entries(visibility).map(([field, isVisible]) => ({
      field,
      isVisible,
    }));
    await updateVisibilitySettings(updates);
  };

  return (
    <Box border="1px" borderColor="gray.200" p="4" borderRadius="md">
      <VStack align="start">
        {fields.map((field) => (
          <Checkbox
            key={field}
            isChecked={visibility[field]}
            onChange={() => toggleVisibility(field)}
          >
            {field}
          </Checkbox>
        ))}
      </VStack>
      <Button mt="4" colorScheme="blue" onClick={handleSave}>Salvar</Button>
    </Box>
  );
};

export default AdminPanel;