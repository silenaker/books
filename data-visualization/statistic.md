# Statistic Model

Glossary: _dimension_, _vector_, _source_metrics_vector_, _dest_metrics_vector_, _group_, _search_, _filter_, _dimensionality reduction_, _aggregation_

_vector_ = _dimension_[]  
_dimensionality reduction_ = _vector_[] => array of _dimension_reduced_vector_[] or map of (key: one of the discrete value of reduced dimension, there may be discretization for continuous dimension; value: _dimension_reduced_vector_[])

procedure:

1. search by composed filter  
   _source_metrics_vector_[] => _source_metrics_vector_[]
2. first level dimensionality reduction (usually known as group)  
   _source_metrics_vector_[] => _first_reduced_source_metrics_vector_[][] | { one of the discrete value of reduced dimension : _first_reduced_source_metrics_vector_[] }
3. aggregation in each group  
   _reduced_source_metrics_vector_[] => _dest_metrics_vector_  
   there may be second or third, etc. level dimensionality reduction applied recursively before aggregation  
   (e.g. first_reduced_source_metrics_vector[] => second_reduced_source_metrics_vector[][])
4. combined all dest_metrics_vector of each group
5. visualize, pipeline to another procedure, store, etc
