import { Option } from '../model/site.model';

export const craeteOption = async () => {
  const res = await Option.create();
  return res.dataValues;
};
