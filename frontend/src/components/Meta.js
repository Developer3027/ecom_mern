import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'NutraSite',
  description:
    'We sell the most wonderful and best selling health supplements on the internet.',
  keywords: 'DeTox, Pre Workout, Muscle Mass, Energy'
};

export default Meta;
