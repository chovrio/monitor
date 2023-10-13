import { Option } from '../model/site.model';

export const craeteOption = async () => {
  const res = await Option.create();
  return res.dataValues;
};

export const findSiteOption = async (id: string) => {
  const res = await Option.findOne({
    where: {
      id,
    },
  });
  return res ? res.dataValues : null;
};
