import { FileDataStore } from '@/utils/user-data';

export interface RootState {
  filestore: FileDataStore;
  modalOpen: boolean;
  modalComponent: string;
  modalProps: any;
}
